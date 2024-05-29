from django.apps import AppConfig

class GOGConfig(AppConfig):
    name = 'GOG'
    def ready(self):
        import GOG.signals