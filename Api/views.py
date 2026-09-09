from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from django.shortcuts import get_object_or_404
from .serializers import PropertylistingSerializer, SignupSerializers, ReviewSerializer, Property_imageSerializer
from huntified.models import Propertylisting, Review, Property_image,Country
from rest_framework import status
from huntified.utils import analyze_property_image

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
        # 1. Grab the image URLs sent from the frontend
        images_data = request.data.get('images', [])
        
        if images_data:
            # Run AI Fraud Check on the first image (or loop through them)
            is_safe, ai_feedback = analyze_property_image(images_data[0])
            
            if not is_safe:
                return Response(
                    {
                        "error": "Listing rejected by AI Fraud Guard.",
                        "details": ai_feedback
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

        # 2. Proceed with normal serializer validation and saving if safe
        serializer = PropertylistingSerializer(data=request.data)
        if serializer.is_valid():
            property_instance = serializer.save(owner=request.user, country=request.user.country)
            
            for image_url in images_data:
                Property_image.objects.create(property=property_instance, image_url=image_url)
                
            return_serializer = PropertylistingSerializer(property_instance)
            return Response(return_serializer.data, status=201)
            
        return Response(serializer.errors, status=400)
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

@api_view(["GET","POST"])
@permission_classes([IsAuthenticated])
def review_list(request):
    if request.method == "GET":
        review = Review.objects.all()
        serializer = ReviewSerializer(review, many=True)
        return Response(serializer.data)
    if request.method == "POST":
        serializer = ReviewSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save(tenant=request.user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
@api_view(["GET"])
def home(request):
    property = Propertylisting.objects.filter(is_available=True, is_verified=True)
    serializer = PropertylistingSerializer(property, many=True)
    return Response(serializer.data, status=200)

@api_view(['GET'])
def get_countries(request):
    # Grab all active countries you added via the admin panel
    countries = Country.objects.filter(is_active=True).values('id', 'name', 'currency_symbol', 'dialing_code')
    return Response(list(countries))

@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def user_profile_view(request):
    user = request.user
    
    if request.method == 'GET':
        return Response({
            "username": user.username,
            "email": user.email,
            "role": user.role,
            "country_id": user.country.id if user.country else None,
            "country_name": user.country.name if user.country else None,
            "dialing_code": user.country.dialing_code if user.country else None,
            "phone_number": user.phone_number
        })
        
    elif request.method == 'PUT':
        phone_number = request.data.get('phone_number', user.phone_number)
        country_id = request.data.get('country_id')
        
        user.phone_number = phone_number
        if country_id:
            user.country_id = country_id
        user.save()
        
        return Response({"message": "Profile updated successfully!"}, status=status.HTTP_200_OK)

