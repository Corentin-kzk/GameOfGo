from rest_framework import generics
from rest_framework.pagination import PageNumberPagination
from .models import Difficulty, Data
from .serializers import DifficultySerializer, DataSerializer

# Vues pour Difficulty (GET uniquement)
class DifficultyList(generics.ListAPIView):
    queryset = Difficulty.objects.all()
    serializer_class = DifficultySerializer

class DifficultyDetail(generics.RetrieveAPIView):
    queryset = Difficulty.objects.all()
    serializer_class = DifficultySerializer

# Pagination pour Data
class DataPagination(PageNumberPagination):
    page_size = 10

# Vues pour Data
class DataListCreate(generics.ListCreateAPIView):
    queryset = Data.objects.all()
    serializer_class = DataSerializer
    pagination_class = DataPagination

class DataRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Data.objects.all()
    serializer_class = DataSerializer