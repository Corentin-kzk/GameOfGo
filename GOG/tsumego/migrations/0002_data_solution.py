# Generated by Django 5.0.6 on 2024-05-27 12:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tsumego', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='data',
            name='solution',
            field=models.TextField(blank=True, null=True),
        ),
    ]