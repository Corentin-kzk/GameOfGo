from tsumego.models import Difficulty

def fill_difficulties():
    # Liste des difficultés avec leurs niveaux
    difficulties = [
        "Beginner",
        "Intermediate",
        "Advanced",
    ]

    # Parcours de la liste des difficultés et création des objets Difficulty
    for level in difficulties:
        # Vérification pour éviter de créer des doublons
        if not Difficulty.objects.filter(level=level).exists():
            Difficulty.objects.create(level=level)
            print(f"Difficulté '{level}' ajoutée avec succès.")
        