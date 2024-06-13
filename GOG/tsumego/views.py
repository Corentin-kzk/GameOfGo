from rest_framework import generics
from rest_framework.exceptions import NotFound
from rest_framework.pagination import PageNumberPagination
from .models import Difficulty, Data
from .serializers import DifficultySerializer, DataSerializer
from django.db.models import Func
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class Random(Func):
    function = 'RANDOM'

class DifficultyList(generics.ListAPIView):
    queryset = Difficulty.objects.all()
    serializer_class = DifficultySerializer

class DifficultyDetail(generics.RetrieveAPIView):
    queryset = Difficulty.objects.all()
    serializer_class = DifficultySerializer


class DataPagination(PageNumberPagination):
    page_size = 10


class DataListCreate(generics.ListCreateAPIView):
    queryset = Data.objects.all()
    serializer_class = DataSerializer
    pagination_class = DataPagination

class DataRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Data.objects.all()
    serializer_class = DataSerializer


class DataRandomRetrieve(generics.RetrieveAPIView):
    serializer_class = DataSerializer
    @swagger_auto_schema(
        operation_description="Get a random data object",
        manual_parameters=[
            openapi.Parameter(
                'difficulty',
                in_=openapi.IN_QUERY,
                description="Filter by difficulty (optional)",
                type=openapi.TYPE_STRING,
                required=False
            ),
        ],
    )

    def get_queryset(self):
        queryset = Data.objects.all()

        # Filtrer par difficulté si le paramètre est présent
        difficulty = self.request.query_params.get('difficulty', None)
        if difficulty is not None:
            queryset = queryset.filter(difficulty=difficulty)

        return queryset.order_by(Random())

    def get_object(self):
        queryset = self.get_queryset()

        if not queryset.exists():
            raise NotFound("No data available")

        return queryset.first()