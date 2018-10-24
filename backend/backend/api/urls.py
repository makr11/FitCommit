from django.urls import path
from .views import (ListUsers,
                    ListDeletedUsers,
                    UserDetail,
                    ListServices,
                    ListDeletedServices,
                    ServicesDetail,
                    ListCategories,
                    ListDeletedCategories,
                    CategoriesDetail,
                    ListOptions,
                    ListDeletedOptions,
                    OptionsDetail,
                    ListRecords,
                    RecordsDetail,
                    ListUserRecords,
                    ListArrivals,
                    ListArrivalsByDate,
                    ArrivalsDetail)
from django.contrib.auth import get_user_model

CustomUser = get_user_model()

urlpatterns = [
    path('users/', ListUsers.as_view(), name='users'),
    path('users-deleted/', ListDeletedUsers.as_view(), name='users_del'),
    path('users/<int:pk>', UserDetail.as_view(), name='user_detail'),
    path('user_records/<int:pk>', ListUserRecords.as_view(), name='user_records'),
    path('services/', ListServices.as_view(), name='services'),
    path('services_deleted/', ListDeletedServices.as_view(), name='services_del'),
    path('services/<int:pk>', ServicesDetail.as_view(), name='services_detail'),
    path('categories/', ListCategories.as_view(), name='categories'),
    path('categories_deleted/', ListDeletedCategories.as_view(), name='categories_del'),
    path('categories/<int:pk>', CategoriesDetail.as_view(), name='categories_detail'),
    path('options/', ListOptions.as_view(), name='options'),
    path('options_deleted/', ListDeletedOptions.as_view(), name='options_del'),
    path('options/<int:pk>', OptionsDetail.as_view(), name='options_detail'),
    path('records/', ListRecords.as_view(), name='records'),
    path('records/<int:pk>', RecordsDetail.as_view(), name='records_detail'),
    path('arrivals/', ListArrivals.as_view(), name='users_active'),
    path('arrivals/<str:date>', ListArrivalsByDate.as_view(), name='arrivals_by_date'),
    path('arrival/<int:pk>', ArrivalsDetail.as_view(), name='arrivals_detail'),
]
