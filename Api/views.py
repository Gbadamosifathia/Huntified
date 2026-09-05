from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from django.shortcuts import get_object_or_404
from .serializers import PropertylistingSerializer, SignupSerializers
from huntified.models import Propertylisting

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        refresh_token = request.data.get('refresh')
        token = RefreshToken(refresh_token)
        token.blacklist()                                                                                                                                                                         
        return Response(status= 205)
    except (TokenError, Exception):
        return Response({'Error' : 'Invalid or expired token' }, status=400)
@api_view(['POST'])
def signup(request):
    serializer = SignupSerializers(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'user created successfully'}, status=201)
    return Response(serializer.errors, status=400)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def search_filter(request):
    properties = Propertylisting.objects.filter(country=request.user.country)
    property_name_param = request.query_params.get('name')
    location_param = request.query_params.get('location')
    price_param = request.query_params.get('price')
    available_param = request.query_params.get('is_available')
    verified_param = request.query_params.get('is_verified')
    if property_name_param:
        properties = properties.filter(name__icontains=property_name_param)
    if location_param:
        properties = properties.filter(location__icontains=location_param)
    if price_param:
        properties = properties.filter(price__lte=price_param)
    if available_param:
        properties = properties.filter(is_available = available_param)
    if verified_param:
        properties = properties.filter(is_verified = verified_param)
    serializer = PropertylistingSerializer(properties, many = True)
    return Response(serializer.data, status= 200)

@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def list_property_create(request):
    if request.method == "GET":
        properties = Propertylisting.objects.filter(country=request.user.country)
        serializer = PropertylistingSerializer(properties, many=True)
        return Response(serializer.data)
    if request.method == "POST":
        serializer = PropertylistingSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status= 400)
@api_view(["GET", "PUT", "DELETE"])
@permission_classes([IsAuthenticated])
def property_details(request, pk):
    property = get_object_or_404(Propertylisting, pk=pk)
    if request.method == "GET":
        serializer = PropertylistingSerializer(property)
        return Response(serializer.data)
    if request.method == "PUT":
        serializer=PropertylistingSerializer(property, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)
    if request.method == "DELETE":
        property.delete()
        return Response(status=204)