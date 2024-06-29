from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from faker import Faker

User = get_user_model()
fake = Faker()

class Command(BaseCommand):
    help = 'Create a specified number of fake users'

    def add_arguments(self, parser):
        parser.add_argument('number', type=int, help='Indicates the number of fake users to be created')

    def handle(self, *args, **kwargs):
        number = kwargs['number']
        for _ in range(number):
            username = fake.user_name()
            email = fake.email()
            first_name = fake.first_name()
            last_name = fake.last_name()
            password = 'password123'  # Utilise un mot de passe par défaut ou génère-en un

            User.objects.create_user(
                username=username,
                email=email,
                first_name=first_name,
                last_name=last_name,
                password=password
            )
            self.stdout.write(self.style.SUCCESS(f'Fake user {username} created.'))
