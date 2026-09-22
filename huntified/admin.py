from django.contrib import admin
from .models import CustomUser, Country, Propertylisting, Property_image, Review, Message

admin.site.register(CustomUser)
admin.site.register(Country)
admin.site.register(Message)
admin.site.register(Propertylisting)
admin.site.register(Property_image)
admin.site.register(Review)
# Register your models here.
