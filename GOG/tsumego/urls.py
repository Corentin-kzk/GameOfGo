from django.urls import path
from .views import DifficultyList, DifficultyDetail, DataListCreate, DataRetrieveUpdateDestroy


urlpatterns = [
    # Routes pour Difficulty (GET uniquement)
    path('difficulties/', DifficultyList.as_view(), name='difficulty-list'),
    path('difficulties/<int:pk>/', DifficultyDetail.as_view(), name='difficulty-detail'),

    # Routes pour Data (CRUD complet)
    path('', DataListCreate.as_view(), name='data-list-create'),
    path('<int:pk>/', DataRetrieveUpdateDestroy.as_view(), name='data-detail'),
]