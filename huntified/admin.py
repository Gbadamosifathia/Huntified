from django.contrib import admin
from .models import CustomUser, Country

admin.site.register(CustomUser)
admin.site.register(Country)

# Register your models here.
