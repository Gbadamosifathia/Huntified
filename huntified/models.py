from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.

class Country(models.Model):
    name = models.CharField(max_length=20)
    currency_symbol = models.CharField(max_length=5)
    dialing_code = models.CharField(max_length=5)
    is_active = models.BooleanField(default=True)   
    def __str__(self):
        return self.name

class CustomUser(AbstractUser):
    role = models.CharField(max_length=20, choices=[
        ('LANDLORD', 'LANDLORD'),
        ('HUNTER', 'HUNTER')
    ])
    country = models.ForeignKey(Country, on_delete=models.CASCADE, null= True, blank=True)
    phone_number = models.CharField(max_length=20)
   
class Propertylisting(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, limit_choices_to={'role': 'LANDLORD'})
    name = models.TextField()
    description = models.TextField()
    location = models.CharField(max_length=200)
    base_rent = models.DecimalField(max_digits=12, decimal_places=2)
    agent_fee= models.DecimalField(max_digits=12, decimal_places=2)
    legal_fee = models.DecimalField(max_digits=12, decimal_places=2)
    caution_deposit = models.DecimalField(max_digits=12, decimal_places=2) 
    service_charge = models.DecimalField(max_digits=12, decimal_places=2)
    property_type = models.CharField(max_length=100)
    is_available = models.BooleanField(default=True)
    is_verified = models.BooleanField(default=False)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    def save(self, *args, **kwargs):
        self.price = self.base_rent + self.agent_fee + self.legal_fee + self.caution_deposit + self.service_charge
        super().save(*args, **kwargs)

class Property_image(models.Model):
    property = models.ForeignKey(Propertylisting, on_delete=models.CASCADE, related_name='images')
    image_url = models.URLField(max_length=500)
    uploaded_at = models.DateTimeField(auto_now_add=True)

class Review(models.Model):
    property = models.ForeignKey(Propertylisting, on_delete=models.CASCADE)
    tenant = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    rating = models.PositiveSmallIntegerField(validators=[MinValueValidator(1), MaxValueValidator(2)])
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class Message(models.Model):
    sender = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='sent_messages')
    recipient = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='received_messages')
    property = models.ForeignKey(Propertylisting, on_delete=models.CASCADE)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)