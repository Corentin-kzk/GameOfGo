import os

from django.db.models.signals import post_migrate
from django.dispatch import receiver
from .script.fill_difficulties import fill_difficulties
from .script.import_data import import_data_from_remote
from .script.loader import Loader
from requests.auth import HTTPBasicAuth
from tsumego.models import Difficulty


@receiver(post_migrate)
def on_post_migrate(sender, **kwargs):
    loader_dif = Loader(label='Difficulty is Loading ', ending_label='Difficulty loading finish !')
    loader_data = Loader(label='Tsumego is downloading ', ending_label='Tsumego loading finish !')
    if sender.name == 'tsumego':
        loader_dif.start()
        fill_difficulties()
        loader_dif.stop()
        urls = ["1a. Tsumego Beginner", "1b. Tsumego Intermediate", "1c. Tsumego Advanced"]
        auth = HTTPBasicAuth('username', os.getenv('GITHUB_ID'))
        difficulties = {
            "Beginner": Difficulty.objects.get(level="Beginner"),
            "Intermediate": Difficulty.objects.get(level="Intermediate"),
            "Advanced": Difficulty.objects.get(level="Advanced"),
            }

        dicts = {}
        loader_data.start()
        for url in urls:
            difficulty = difficulties[url.split(" ")[-1]]
            remote_dir_url = f"https://api.github.com/repos/sanderland/tsumego/contents/problems/{url}"
            dicts[difficulty] = import_data_from_remote(remote_dir_url, auth, difficulty)
        loader_data.stop()


