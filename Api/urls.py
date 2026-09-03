from django.urls import path
from . import views
urlpatterns = [
    path('search_filter/', views.search_filter, name='search_filter'),
    path()
]