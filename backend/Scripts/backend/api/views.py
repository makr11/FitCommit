from rest_framework import generics, status, serializers, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from django.contrib.auth import get_user_model

from .models import Services, Categories, Options, CustomUser

from .serializers import UserSerializer, ServicesSerializer

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
    