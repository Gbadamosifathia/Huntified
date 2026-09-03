from rest_framework import serializers
from huntified.models import Propertylisting, Property_image


class Property_imageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Property_image
        fields = "__all__"

class PropertylistingSerializer(serializers.ModelSerializer):
    images = Property_imageSerializer(many=True, read_only=True, source = 'property_image_')
    class Meta:
        model = Propertylisting
        fields = "__all__"
