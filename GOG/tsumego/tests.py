from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Difficulty, Data

class DifficultyTests(APITestCase):
    def setUp(self):
        self.difficulty = Difficulty.objects.create(level="Easy")
        self.difficulty2 = Difficulty.objects.create(level="Medium")

    def test_get_difficulties(self):
        url = reverse('difficulty-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_get_difficulty_detail(self):
        url = reverse('difficulty-detail', kwargs={'pk': self.difficulty.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['level'], self.difficulty.level)

class DataTests(APITestCase):
    def setUp(self):
        self.difficulty = Difficulty.objects.create(level="Easy")
        self.data = Data.objects.create(
            difficulty=self.difficulty,
            black_stones={"positions": [[1, 1], [2, 2]]},
            white_stones={"positions": [[3, 3], [4, 4]]},
            board_size=19,
            comment="Test comment",
            name="Test Name",
            slug="test-name",
            solution="Test solution"
        )

    def test_get_data_list(self):
        url = reverse('data-list-create')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)

    def test_create_data(self):
        url = reverse('data-list-create')
        data = {
            "difficulty": self.difficulty.id,
            "black_stones": {"positions": [[5, 5], [6, 6]]},
            "white_stones": {"positions": [[7, 7], [8, 8]]},
            "board_size": 19,
            "comment": "Another test comment",
            "name": "Another Test Name",
            "slug": "another-test-name",
            "solution": "Another test solution"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Data.objects.count(), 2)

    def test_get_data_detail(self):
        url = reverse('data-detail', kwargs={'pk': self.data.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], self.data.name)

    def test_update_data(self):
        url = reverse('data-detail', kwargs={'pk': self.data.id})
        updated_data = {
            "difficulty": self.difficulty.id,
            "black_stones": {"positions": [[1, 1], [2, 2]]},
            "white_stones": {"positions": [[3, 3], [4, 4]]},
            "board_size": 19,
            "comment": "Updated comment",
            "name": "Updated Name",
            "slug": "updated-name",
            "solution": "Updated solution"
        }
        response = self.client.put(url, updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.data.refresh_from_db()
        self.assertEqual(self.data.comment, "Updated comment")
        self.assertEqual(self.data.name, "Updated Name")

    def test_delete_data(self):
        url = reverse('data-detail', kwargs={'pk': self.data.id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Data.objects.count(), 0)
