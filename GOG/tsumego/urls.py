from django.urls import path
from .views import DifficultyList, DifficultyDetail, DataListCreate, DataRetrieveUpdateDestroy, DataRandomRetrieve
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions

schema_view = get_schema_view(
    openapi.Info(
        title="My API",
        default_version='v1',
        description="My API description",
        terms_of_service="https://www.example.com/terms/",
        contact=openapi.Contact(email="contact@example.com"),
        license=openapi.License(name="Awesome License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)


urlpatterns = [
    # Routes pour Difficulty (GET uniquement)
    path('difficulties/', DifficultyList.as_view(), name='difficulty-list'),
    path('difficulties/<int:pk>/', DifficultyDetail.as_view(), name='difficulty-detail'),

    # Routes pour Data (CRUD complet)
    path('', DataListCreate.as_view(), name='data-list-create'),
    path('<int:pk>/', DataRetrieveUpdateDestroy.as_view(), name='data-detail'),
    path('random', DataRandomRetrieve.as_view(), name='data-random')
]