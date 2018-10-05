import datetime

from django.contrib.auth import get_user_model

from rest_framework import serializers as drf_serializers

from .models import CustomUser, Services, Categories, Options, Records, Arrivals


CustomUser = get_user_model()
now=datetime.datetime.now()

class OptionsSerializer(drf_serializers.ModelSerializer):

    class Meta:
        model = Options
        fields = '__all__'

class CategoriesSerializer(drf_serializers.ModelSerializer):

    options = OptionsSerializer(many=True, read_only=True)

    class Meta:
        model = Categories
        fields = '__all__'

class ServicesSerializer(drf_serializers.ModelSerializer):

    categories = CategoriesSerializer(many=True, read_only=True)
 
    class Meta:
        model = Services
        fields = '__all__'

class RecordsSerializer(drf_serializers.ModelSerializer):
    user = drf_serializers.ReadOnlyField()
    service = drf_serializers.CharField(source='serviceObj')
    category = drf_serializers.CharField(source='categoryObj')
    arrivals = drf_serializers.CharField(source='optionObj.arrivals')
    duration = drf_serializers.CharField(source='optionObj.duration')

    class Meta:
        model = Records
        fields = '__all__'

class UserSerializer(drf_serializers.ModelSerializer):
    
    class Meta:
        model = CustomUser
        fields = '__all__'

class ArrivalsSerializer(drf_serializers.ModelSerializer):
    user = drf_serializers.CharField(source='userObj')
    service = drf_serializers.CharField(source='recordObj.serviceObj')
    category = drf_serializers.CharField(source='recordObj.categoryObj')
    arrivals_left = drf_serializers.IntegerField(source='recordObj.arrivals_left')
    paid = drf_serializers.BooleanField(source='recordObj.paid')

    class Meta:
        model = Arrivals
        fields = '__all__'