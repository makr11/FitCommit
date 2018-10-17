import datetime
import pytz
from rest_framework import generics, status, serializers, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from django.core import serializers
from django.utils import timezone
from .models import Services, Categories, Options, CustomUser, Records, Arrivals
from .serializers import (UserSerializer, 
                         ServicesSerializer, 
                         CategoriesSerializer, 
                         OptionsSerializer, 
                         RecordsSerializer, 
                         ArrivalsSerializer,
                         )

CustomUser = get_user_model()

class ListUsers(generics.ListCreateAPIView):
    queryset = CustomUser.objects.filter(deleted=0)
    serializer_class = UserSerializer

class ListDeletedUsers(generics.ListCreateAPIView):
    queryset = CustomUser.objects.filter(deleted=1)
    serializer_class = UserSerializer

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

class ListServices(generics.ListCreateAPIView):
    queryset = Services.objects.all()
    serializer_class = ServicesSerializer

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

class ListCategories(generics.ListCreateAPIView):
    queryset = Categories.objects.all()
    serializer_class = CategoriesSerializer

    def create(self, request):
        serializer = CategoriesSerializer(data=request.data)
        print(serializer)
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

class ListOptions(generics.ListCreateAPIView):
    queryset = Options.objects.all()
    serializer_class = OptionsSerializer

    def create(self, request):
        serializer = OptionsSerializer(data=request.data)
        if serializer.is_valid():
            category = Categories.objects.get(pk=request.data['categoryID'])
            options = Options(arrivals=request.data['arrivals'], 
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

class ListRecords(generics.ListCreateAPIView):
    queryset = Records.objects.all().order_by('-ends')
    serializer_class = RecordsSerializer

    def create(self, request):
        now = timezone.now()
        user = CustomUser.objects.get(pk=request.data['user'])
        service = Services.objects.get(pk=request.data['service'])
        category = Categories.objects.get(pk=request.data['category'])
        option = Options.objects.get(pk=request.data['option'])
        discount = request.data['discount']
        ends = now + datetime.timedelta(days=option.duration)
        days_left = ends - now
        record = Records(
            userObj=user, 
            serviceObj=service,
            categoryObj=category,
            optionObj=option,
            arrivals_left=option.arrivals,
            price=option.price,
            discount=request.data['discount'],
            nett_price=request.data['nettPrice'],
            paid=request.data['paid'],
            started=now,
            ends=ends,
            days_left=days_left.days)
        record.save()
        return Response()

class ListUserRecords(generics.ListAPIView):
    serializer_class = RecordsSerializer

    def get_queryset(self):
        user=self.kwargs['pk']
        return Records.objects.filter(userObj=user, deleted=0).order_by('-ends')

class RecordsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Records.objects.all()
    serializer_class = RecordsSerializer

class ListArrivals(generics.ListCreateAPIView):
    queryset = Arrivals.objects.all().order_by('-arrival')
    serializer_class = ArrivalsSerializer

    def create(self, request):
        now = timezone.now()
        time = now.timetz()
        user = CustomUser.objects.get(pk=request.data['user'])
        record = Records.objects.get(pk=request.data['record'])
        record.arrivals_left -= 1
        record.save() 
        arrival = Arrivals(
            userObj=user,
            recordObj=record,
            arrival=now,
            arrival_time=str(time.hour + 2) + ":" + str(time.minute)
        )
        arrival.save()
        return Response()

class ListArrivalsByDate(generics.ListAPIView):
    serializer_class = ArrivalsSerializer

    def get_queryset(self):
        selected_date=self.kwargs['date']
        return Arrivals.objects.filter(arrival__date=selected_date).order_by('-arrival')

class ArrivalsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Arrivals.objects.all()
    serializer_class = ArrivalsSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        record = Records.objects.get(pk=instance.recordObj.id)
        record.arrivals_left+=1
        record.save()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)