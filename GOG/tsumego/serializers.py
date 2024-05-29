from rest_framework import serializers
from .models import Difficulty, Data

class DifficultySerializer(serializers.ModelSerializer):
    class Meta:
        model = Difficulty
        fields = ['id', 'level']

class DataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Data
        fields = ['id', 'difficulty', 'black_stones', 'white_stones', 'board_size', 'comment', 'name', 'slug', 'solution']
