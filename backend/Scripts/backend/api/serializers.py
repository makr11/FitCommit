import datetime

from django.contrib.auth import get_user_model
from django.core import serializers as django_serializers

from rest_framework import serializers as drf_serializers

from .models import CustomUser, Services, Categories, Options, Records


CustomUser = get_user_model()
now=datetime.datetime.now()

class OptionsSerializer(drf_serializers.ModelSerializer):

    class Meta:
        model = Options
        fields = ('id', 'quantity', 'price', 'duration', 'categoryID')

class CategoriesSerializer(drf_serializers.ModelSerializer):

    options = OptionsSerializer(many=True, read_only=True)

    class Meta:
        model = Categories
        fields = ('id', 'category', 'serviceID', 'options')

class ServicesSerializer(drf_serializers.ModelSerializer):

    categories = CategoriesSerializer(many=True, read_only=True)
 
    class Meta:
        model = Services
        fields = ('id', 'service', 'categories')

class RecordsSerializer(drf_serializers.ModelSerializer):

    class Meta:
        model = Records
        fields = '__all__'

class UserSerializer(drf_serializers.ModelSerializer):
    
    class Meta:
        model = CustomUser
        fields = '__all__'

