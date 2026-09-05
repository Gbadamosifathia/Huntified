from django.urls import path
from . import views
urlpatterns = [
    path('search_filter/', views.search_filter, name='search_filter'),
    path('list_property_create/', views.list_property_create, name='list_property_create'),
    path('property_details/<int:pk>/', views.property_details, name= 'propery_details'),
    path('logout/', views.logout, name='logout'),
    path('signup/', views.signup, name='signup'),
]