from rest_framework import serializers
from huntified.models import Propertylisting, Property_image, CustomUser, Review
from django.contrib.auth.models import AbstractUser


class Property_imageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Property_image
        fields = "__all__"

class PropertylistingSerializer(serializers.ModelSerializer):
    images = Property_imageSerializer(many=True, read_only=True)
    class Meta:
        model = Propertylisting
        fields = "__all__"

class SignupSerializers(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['role', 'first_name', 'last_name','username', 'email', 'country', 'phone_number','password',]
        extra_kwargs = {'password':{'write_only': True}}
    def validate_email(self, Value):
        if CustomUser.objects.filter(email=Value).exists():
            raise serializers.ValidationError("Email is already in use")
        return Value
    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            role = validated_data.get('role'),
            first_name= validated_data.get('first_name'),
            last_name = validated_data.get('last_name'),
            username = validated_data.get('username'),
            email= validated_data.get('email'),
            country = validated_data.get('country'),
            phone_number = validated_data.get('phone_number'),
            password= validated_data.get('password'),
        )
        return user
class ReviewSerializer(serializers.ModelSerializer):
    tenant_username = serializers.ReadOnlyField(source='tenant.username')
    class Meta:
        model = Review
        fields = ['id','property', 'tenant_username', 'tenant', 'rating', 'comment', 'created_at']
        read_only_fields=['tenant','created_at']
        