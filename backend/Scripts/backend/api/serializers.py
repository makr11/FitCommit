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

    options = drf_serializers.SerializerMethodField()


    def get_options(self, obj):
        try:
            qs = Options.objects.filter(deleted=0, categoryID=obj.id)
            serializer = OptionsSerializer(instance=qs, many=True, read_only=True)
            return serializer.data
        except AttributeError:
            pass

    class Meta:
        model = Categories
        fields = '__all__'

class ServicesSerializer(drf_serializers.ModelSerializer):

    categories = drf_serializers.SerializerMethodField()

    def get_categories(self, obj):
        try:
            qs = Categories.objects.filter(deleted=0, serviceID=obj.id)
            serializer = CategoriesSerializer(instance=qs, many=True, read_only=True)
            return serializer.data
        except AttributeError:
            pass

    class Meta:
        model = Services
        fields = '__all__'

class RecordsSerializer(drf_serializers.ModelSerializer):
    user = drf_serializers.ReadOnlyField()
    service = drf_serializers.CharField(source='serviceObj')
    category = drf_serializers.CharField(source='categoryObj')
    arrivals = drf_serializers.CharField(source='optionObj.arrivals')
    duration = drf_serializers.CharField(source='optionObj.duration')
    started = drf_serializers.DateField(format="%d.%m.%Y")
    ends = drf_serializers.DateField(format="%d.%m.%Y")

    class Meta:
        model = Records
        fields = '__all__'

class UserSerializer(drf_serializers.ModelSerializer):
    debt = drf_serializers.SerializerMethodField()

    def get_debt(self, obj):
        qs = Records.objects.filter(userObj=obj.id, paid=False)
        sum = 0
        for i in qs:
            sum+=i.nett_price
        return sum

    class Meta:
        model = CustomUser
        fields = '__all__'

class ArrivalsSerializer(drf_serializers.ModelSerializer):
    user = drf_serializers.CharField(source='userObj')
    service = drf_serializers.CharField(source='recordObj.serviceObj')
    category = drf_serializers.CharField(source='recordObj.categoryObj')
    arrivals_left = drf_serializers.IntegerField(source='recordObj.arrivals_left')
    paid = drf_serializers.BooleanField(source='recordObj.paid')
    arrival_time = drf_serializers.TimeField(format="%H:%M")

    class Meta:
        model = Arrivals
        fields = '__all__'
