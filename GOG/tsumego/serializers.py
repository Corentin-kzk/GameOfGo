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
        user = data.get('user')
        tsumego = data.get('tsumego')

        if UserTsumego.objects.filter(user=user, tsumego=tsumego).exists():
            raise serializers.ValidationError("User already has a game for this tsumego.")

        return data
