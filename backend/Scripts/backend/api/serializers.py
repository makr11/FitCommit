from rest_framework import serializers
from .models import CustomUser, Services, Categories, Options, Records
from django.contrib.auth import get_user_model

CustomUser = get_user_model()

class OptionsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Options
        fields = ('id', 'quantity', 'price', 'duration', 'categoryID')

class CategoriesSerializer(serializers.ModelSerializer):

    options = OptionsSerializer(many=True, read_only=True)

    class Meta:
        model = Categories
        fields = ('id', 'category', 'serviceID', 'options')

class ServicesSerializer(serializers.ModelSerializer):

    categories = CategoriesSerializer(many=True, read_only=True)
 
    class Meta:
        model = Services
        fields = ('id', 'service', 'categories')

class RecordsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Records
        fields = ('id',
                  'userObj',
                  'servicesObj',
                  'categoriesObj',
                  'optionsObj',
                  'user', 
                  'service', 
                  'category', 
                  'quantity', 
                  'quantity_left', 
                  'price', 
                  'discount', 
                  'nett_price', 
                  'paid', 
                  'duration', 
                  'started', 
                  'ends', 
                  'days_left')

class UserSerializer(serializers.ModelSerializer):

    records = RecordsSerializer(source='user_records', read_only=True, many=True)
    
    class Meta:
        model = CustomUser
        fields = ('id', 
                  'first_name', 
                  'last_name', 
                  'username', 
                  'password', 
                  'email', 
                  'date_joined', 
                  'phone', 
                  'birth_date',
                  'records',
                  )