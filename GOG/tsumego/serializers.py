from rest_framework import serializers
from .models import Difficulty, Data, UserTsumego

class DifficultySerializer(serializers.ModelSerializer):
    class Meta:
        model = Difficulty
        fields = ['id', 'level']

class DataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Data
        fields = ['id', 'difficulty', 'black_stones', 'white_stones', 'board_size', 'comment', 'name', 'slug', 'solution']
        extra_kwargs = {
            "difficulty": {"required": False, "allow_null": True}
        }

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserTsumego
        fields = ['id', 'user', 'tsumego', 'solved', 'solved_date']

    def validate(self, data):
        solved_date = data.get('solved_date')

        if UserTsumego.objects.filter(solved_date=solved_date).exists():
            raise serializers.ValidationError("User already has a game for this tsumego.")

        return data
