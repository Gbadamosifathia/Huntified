from django.urls import path
from . import views
urlpatterns = [
    path('search_filter/', views.search_filter, name='search_filter'),
    path('list_property_create/', views.list_property_create, name='list_property_create'),
    path('property_details/<int:pk>/', views.property_details, name= 'propery_details'),
    path('logout/', views.logout, name='logout'),
    path('signup/', views.signup, name='signup'),
    path('review_list', views.review_list, name='review_list'),
    path('home/', views.home, name='home'),
    path('get_countries/', views.get_countries, name='get_countries'),
    path('user_profile/', views.user_profile_view, name='user_profile'),
]