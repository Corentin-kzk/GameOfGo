from django.urls import path
from .views import (
    DifficultyList, DifficultyDetail,
    DataListCreate, DataRetrieveUpdateDestroy,
    GameListCreate, GameRetrieveUpdateDestroy, GameByUser
)

urlpatterns = [

    path('difficulties/', DifficultyList.as_view(), name='difficulty-list'),
    path('difficulties/<int:pk>/', DifficultyDetail.as_view(), name='difficulty-detail'),

    path('', DataListCreate.as_view(), name='data-list-create'),
    path('<int:pk>/', DataRetrieveUpdateDestroy.as_view(), name='data-detail'),


    path('games/', GameListCreate.as_view(), name='game-list-create'),
    path('games/<int:pk>/', GameRetrieveUpdateDestroy.as_view(), name='game-detail'),


    path('games/user/<int:user_id>/', GameByUser.as_view(), name='game-by-user'),
]