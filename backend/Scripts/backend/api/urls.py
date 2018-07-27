from django.urls import path
from .views import ListUsers, UserDetail, ListServices
from django.contrib.auth import get_user_model

CustomUser = get_user_model()

services_list = ListServices.as_view({
    'get': 'list',
    'post': 'create',
})

urlpatterns = [
    path('users/', ListUsers.as_view(), name='users'),
    path('users/<int:pk>', UserDetail.as_view()),
    path('services/', services_list, name='services'),
]
