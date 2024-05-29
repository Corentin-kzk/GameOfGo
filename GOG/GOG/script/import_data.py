import os
import json
import requests
from requests.auth import HTTPBasicAuth
# from django.core.wsgi import get_wsgi_application
from tsumego.models import Data


# Assurez-vous que les paramètres de Django sont chargés
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'GOG.settings')
# application = get_wsgi_application()

def format_tsumego(data):
    size = int(data['SZ'])

    # Convert letter-number coordinates to board indices
    def convert_coords(coord):
        letter_to_index = {chr(i): i - 97 for i in range(97, 97 + size)}
        return [letter_to_index[coord[0]], letter_to_index[coord[1]]]

    # Convert list of coordinates
    def convert_list_coords(coords):
        return [convert_coords(coord) for coord in coords]

    # Convert solutions
    def convert_solutions(solutions):
        converted_solutions = []
        for solution in solutions:
            move = solution[1]
            if move:
                x, y = convert_coords(move)
                converted_solutions.append([solution[0], (x, y), solution[2], solution[3]])
            else:
                converted_solutions.append(solution)
        return converted_solutions

    # Format the dictionary
    formatted_data = {
        'AB': convert_list_coords(data['AB']),
        'AW': convert_list_coords(data['AW']),
        'SZ': size,
        'C': data['C'],
        'SOL': convert_solutions(data['SOL'])
        }

    return formatted_data

def import_data_from_remote(url, token, difficulty):
    data_dict = {}  # Initialisation du dictionnaire pour stocker les données JSON
    # Récupérez le contenu du répertoire à partir de l'API GitHub avec authentification
    response = requests.get(url, auth=token)
    if response.status_code == 200:
        try:
            data = response.json()
            # Parcourez chaque élément dans le répertoire
            for item in data:
                # Si l'élément est un répertoire, récursivement explorez son contenu
                if item.get("type") == "dir":
                    subdir_url = item.get("url")
                    subdir_data_dict = import_data_from_remote(subdir_url, token, difficulty)
                    data_dict.update(
                        subdir_data_dict)  # Mettez à jour le dictionnaire avec les données du sous-répertoire
                # Si l'élément est un fichier JSON, traitez-le
                elif item.get("type") == "file" and item.get("name").endswith(".json"):
                    file_url = item.get("download_url")
                    file_response = requests.get(file_url, auth=token)
                    if file_response.status_code == 200:
                        try:
                            json_data = format_tsumego(file_response.json())
                            file_name = item.get("name").removesuffix(".json")
                            data_dict[
                                file_name] = json_data  # Ajoutez les données JSON au dictionnaire avec le nom du fichier comme clé
                            slug_candidate = Data().slugify_name(file_name, difficulty)
                            if not Data.objects.filter(slug=slug_candidate).exists():
                                Data.objects.create(name=file_name,
                                                    difficulty=difficulty,
                                                    black_stones=json_data["AB"],
                                                    white_stones=json_data["AW"],
                                                    board_size=json_data["SZ"],
                                                    comment=json_data["C"],
                                                    solution=json_data["SOL"])
                                # print(f"Le tsumego '{slug_candidate}'avec la difficulté {difficulty} ajoutée avec succès.")
                            else:
                                print(f"Le tsumego '{slug_candidate}' avec la difficulté {difficulty} existe déjà.")
                        except json.JSONDecodeError as e:
                            print(f"Erreur de décodage JSON pour {file_url}: {e}")
        except json.JSONDecodeError as e:
            print(f"Erreur de décodage JSON pour {url}: {e}")
    else:
        print(f"Erreur de requête HTTP: {response.status_code}")

    return data_dict  # Retourne le dictionnaire contenant les données JSON


# if __name__ == "__main__":
#     urls = ["1a. Tsumego Beginner", "1b. Tsumego Intermediate", "1c. Tsumego Advanced"]
#     auth = HTTPBasicAuth('username', "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")
#
#     dicts = {}
#     for url in urls:
#         difficulty = url.split(" ")[-1]
#         # URL de l'API GitHub pour lister le contenu du répertoire racine
#         remote_dir_url = f"https://api.github.com/repos/sanderland/tsumego/contents/problems/{url}"
#         dicts[difficulty] = import_data_from_remote(remote_dir_url, auth, difficulty)
#
#     with open('donnees.json', 'w') as fichier:
#         # Écrire les données dans le fichier en format JSON
#         json.dump(dicts, fichier, indent=4, ensure_ascii=False)
