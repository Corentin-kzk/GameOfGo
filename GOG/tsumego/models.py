from django.contrib.auth.models import User
from django.utils import timezone
from django.db import models

class Difficulty(models.Model):
    level = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.level


class Data(models.Model):
    difficulty = models.ForeignKey(Difficulty, on_delete=models.CASCADE)
    black_stones = models.JSONField()
    white_stones = models.JSONField()
    board_size = models.IntegerField()
    comment = models.TextField()
    name = models.TextField(null=True, blank=True)
    slug = models.SlugField(unique=True, blank=True)
    solution = models.TextField(null=True, blank=True)
    users = models.ManyToManyField(User, through='UserTsumego')

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = self.slugify_name(self.name, self.difficulty)
        super().save(*args, **kwargs)

    def slugify_name(self, name, difficulty, asset=''):
        prob_num = name.lower().replace('prob', '').strip()
        prob_num = prob_num.zfill(3)  # Formate le numéro du problème avec trois chiffres
        difficulty_level = difficulty.level.lower().replace(' ', '-')[:3]
        return f"{prob_num}-{difficulty_level}-{asset}"


class UserTsumego(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tsumego = models.ForeignKey(Data, on_delete=models.CASCADE)
    solved = models.BooleanField(default=False)
    solved_date = models.DateTimeField(null=True, blank=True)
    deleted_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.username} - {self.tsumego.name}"

    def soft_delete(self):
        self.deleted_at = timezone.now()
        self.save()