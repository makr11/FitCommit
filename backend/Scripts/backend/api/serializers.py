from rest_framework import serializers
from .models import CustomUser, Services, Categories, Options
from django.contrib.auth import get_user_model

CustomUser = get_user_model()

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ('id', 'first_name', 'last_name', 'username', 'password', 'email', 'date_joined', 'phone', 'birth_date')

class ServicesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Services
        fields = ('id', 'service',)

class CategoriesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Categories
        fields = ('id', 'category',)

class OptionsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Options
        fields = ('id', 'quantity', 'price', 'duration')
