from django.contrib import admin
from django.urls import path, include
from rest_framework.schemas import get_schema_view
from rest_framework.documentation import include_docs_urls
from rest_framework import permissions

schema_view = get_schema_view(
    title="tsumego API",
    description="API for the tsumego application",
    version="1.0.0",
    public=True,
    permission_classes=(permissions.AllowAny,),
    authentication_classes=[]
)

urlpatterns = [
    path('', get_schema_view(title='Blog API', description='API for the Blog application', version='1.0.0'), name='api-schema'),
    path('docs/', include_docs_urls(title='Blog API')),
    path("admin/", admin.site.urls),
    path('api/tsumego/', include('tsumego.urls')),
    path('api/auth/', include('authapp.urls')),
]

