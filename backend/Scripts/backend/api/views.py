import datetime

from rest_framework import generics, status, serializers, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from django.contrib.auth import get_user_model
from django.core import serializers

from .models import Services, Categories, Options, CustomUser, Records

from .serializers import UserSerializer, ServicesSerializer, CategoriesSerializer, OptionsSerializer, RecordsSerializer

now = datetime.datetime.now()

CustomUser = get_user_model()

class ListUsers(generics.ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

class ListServices(viewsets.ModelViewSet):
    serializer_class = ServicesSerializer
    
    def get_queryset(self):
        return Services.objects.all()

    def create(self, request):
        serializer = ServicesSerializer(data=request.data)
        if serializer.is_valid():
            service = Services(service=request.data['service'])
            service.save()
            category = Categories(category=request.data['category'], serviceID=service)
            category.save()
            options = Options(quantity=request.data['quantity'], 
                              price=request.data['price'],
                              duration=request.data['duration'],
                              categoryID=category)
            options.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)

class ServicesDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Services.objects.all()
    serializer_class = ServicesSerializer

class ListCategories(viewsets.ModelViewSet):
    serializer_class = CategoriesSerializer
    
    def get_queryset(self):
        return Categories.objects.all()

    def create(self, request):
        serializer = CategoriesSerializer(data=request.data)
        if serializer.is_valid():
            service = Services.objects.get(pk=request.data['serviceID'])
            category = Categories(category=request.data['category'], serviceID=service)
            category.save()
            options = Options(quantity=request.data['quantity'], 
                              price=request.data['price'],
                              duration=request.data['duration'],
                              categoryID=category)
            options.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)

class CategoriesDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Categories.objects.all()
    serializer_class = CategoriesSerializer

class ListOptions(viewsets.ModelViewSet):
    serializer_class = OptionsSerializer
    
    def get_queryset(self):
        return Options.objects.all()

    def create(self, request):
        serializer = OptionsSerializer(data=request.data)
        if serializer.is_valid():
            category = Categories.objects.get(pk=request.data['categoryID'])
            options = Options(quantity=request.data['quantity'], 
                              price=request.data['price'],
                              duration=request.data['duration'],
                              categoryID=category)
            options.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)

class OptionsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Options.objects.all()
    serializer_class = OptionsSerializer

class ListRecords(viewsets.ModelViewSet):
    serializer_class = RecordsSerializer
    
    def get_queryset(self):
        return Records.objects.all()

    def create(self, request):
        user = CustomUser.objects.get(pk=request.data['user'])
        service = Services.objects.get(pk=request.data['service'])
        category = Categories.objects.get(pk=request.data['category'])
        option = Options.objects.get(pk=request.data['option'])
        price = option.price
        discount = 0.5
        started = now
        ends = started + datetime.timedelta(days=option.duration)
        days_left = ends - now
        record = Records(
            userObj=user, 
            servicesObj=service,
            categoriesObj=category,
            optionsObj=option,
            user=user.first_name + " " + user.last_name,
            service=service.service,
            category=category.category,
            quantity=option.quantity,
            quantity_left=option.quantity,
            price=option.price,
            discount=0.5,
            nett_price=price*discount,
            paid=True,
            duration=option.duration,
            started=started,
            ends=ends,
            days_left=days_left.days)
        record.save()
        return Response()

class RecordsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Records.objects.all()
    serializer_class = RecordsSerializer