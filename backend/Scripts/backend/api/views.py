import datetime
import pytz
from rest_framework import generics, status, serializers, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from django.core import serializers
from django.utils import timezone
from .models import Setup, Services, Categories, Options, CustomUser, Records, Arrivals
from .serializers import (
                         SetupSerializer,
                         UserSerializer,
                         ServicesSerializer,
                         CategoriesSerializer,
                         OptionsSerializer,
                         RecordsSerializer,
                         ArrivalsSerializer,
                         )

CustomUser = get_user_model()

class ListSetup(generics.ListAPIView):
    queryset = Setup.objects.all()
    serializer_class = SetupSerializer

class ListUsers(generics.ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        last_user = CustomUser.objects.last()
        if last_user is None:
            ID="00000"
        else:
            ID = str(int(last_user.IDUser) + 1).zfill(5)
        request.data["IDUser"] = ID
        serializer = self.get_serializer(data=request.data)
        print("before")
        serializer.is_valid(raise_exception=True)
        print("after")
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

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
            options = Options(arrivals=request.data['arrivals'],
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

        if serializer.is_valid():
            service = Services.objects.get(pk=request.data['serviceID'])
            category = Categories(category=request.data['category'], serviceID=service)
            category.save()
            options = Options(arrivals=request.data['arrivals'],
                              price=request.data['price'],
                              duration=request.data['duration'],
                              categoryID=category)
            options.save()
            return Response(serializer.data)
        else:
            print(serializer.errors)
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
            nett_price=request.data['nett_price'],
            paid=request.data['paid'],
            started=now,
            ends=ends,
            days_left=days_left.days)
        record.save()
        return Response()

class ListUserRecordsAll(generics.ListAPIView):
    serializer_class = RecordsSerializer

    def get_queryset(self):
        user=self.kwargs['pk']
        records = Records.objects.filter(userObj=user).order_by('-ends')
        for record in records:
            record.get_days_left()
            record.is_frozen()
        return records

class ListUserRecordsActive(generics.ListAPIView):
    serializer_class = RecordsSerializer

    def get_queryset(self):
        user=self.kwargs['pk']
        records = Records.objects.filter(userObj=user, active=1).exclude(freeze_ended__gt=timezone.now()).order_by('-ends')
        for record in records:
            record.get_days_left()
            record.is_frozen()
        return records

class RecordsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Records.objects.all()
    serializer_class = RecordsSerializer

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.initial_data['frozen'] = instance.frozen + 1
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

class ListArrivals(generics.ListCreateAPIView):
    queryset = Arrivals.objects.all()
    serializer_class = ArrivalsSerializer

    def create(self, request):
        now = timezone.now()
        user = CustomUser.objects.get(pk=request.data['user'])
        record = Records.objects.get(pk=request.data['record'])
        record.arrivals_left -= 1
        record.save()
        record.is_active()
        arrival = Arrivals(
            userObj=user,
            recordObj=record,
            arrival=now
        )
        arrival.save()
        return Response()

class ListArrivalsByDate(generics.ListAPIView):
    serializer_class = ArrivalsSerializer

    def get_queryset(self):
        selected_date=self.kwargs['date']
        return Arrivals.objects.filter(arrival__date=selected_date).order_by('-arrival')

class ListArrivalsByRecord(generics.ListAPIView):
    serializer_class = ArrivalsSerializer

    def get_queryset(self):
        selected_record=self.kwargs['record']
        return Arrivals.objects.filter(recordObj__id=selected_record).order_by('-arrival')

class ArrivalsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Arrivals.objects.all()
    serializer_class = ArrivalsSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        record = Records.objects.get(pk=instance.recordObj.id)
        record.arrivals_left+=1
        record.save()
        record.is_active()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)