from django.conf.urls import url
from .views import main

urlpatterns = [
    url("/main", main, name='main'),
]