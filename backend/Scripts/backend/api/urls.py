from django.urls import path
from .views import (ListUsers, 
                   UserDetail, 
                   ListServices, 
                   ServicesDetail, 
                   ListCategories, 
                   CategoriesDetail, 
                   ListOptions, 
                   OptionsDetail,
                   ListRecords,
                   RecordsDetail)
from django.contrib.auth import get_user_model

CustomUser = get_user_model()

services_list = ListServices.as_view({
    'get': 'list',
    'post': 'create',
})

categories_list = ListCategories.as_view({
    'get': 'list',
    'post': 'create',
})

options_list = ListOptions.as_view({
    'get': 'list',
    'post': 'create',
})

records_list = ListRecords.as_view({
    'get': 'list',
    'post': 'create'
})

urlpatterns = [
    path('users/', ListUsers.as_view(), name='users'),
    path('users/<int:pk>', UserDetail.as_view()),
    path('services/', services_list, name='services'),
    path('services/<int:pk>', ServicesDetail.as_view()),
    path('categories/', categories_list, name='categories'),
    path('categories/<int:pk>', CategoriesDetail.as_view()),
    path('options/', options_list, name='options'),
    path('options/<int:pk>', OptionsDetail.as_view()),
    path('records/', records_list, name='records'),
    path('records/<int:pk>', RecordsDetail.as_view()),
]
