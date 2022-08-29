from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('cases', index),
    path('volunteers', index),
    path('test', index)
]