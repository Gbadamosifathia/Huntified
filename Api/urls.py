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
    path('messages/<int:property_id>/<int:other_user_id>/', views.message_history, name='message_history'),
    path('chats/', views.chat_list, name='chat_list'),
    path('verify_image/', views.verify_property_image, name="verify_image"),
    path('my_properties/', views.get_properties, name='get_properties'),
]