from django.urls import path
from .views import (ListSetup,
                    ListUsers,
                    UserDetail,
                    ListServices,
                    ServicesDetail,
                    ListCategories,
                    CategoriesDetail,
                    ListOptions,
                    OptionsDetail,
                    ListRecords,
                    RecordsDetail,
                    ListUserRecordsAll,
                    ListUserRecordsActive,
                    ListArrivals,
                    ListArrivalsByDate,
                    ListArrivalsByRecord,
                    ArrivalsDetail)
from django.contrib.auth import get_user_model

CustomUser = get_user_model()

urlpatterns = [
    path('setup/', ListSetup.as_view(), name='setup'),
    path('users/', ListUsers.as_view(), name='users'),
    path('users/<int:pk>', UserDetail.as_view(), name='user_detail'),
    path('user_records/all/<int:pk>', ListUserRecordsAll.as_view(), name='user_records_all'),
    path('user_records/active/<int:pk>', ListUserRecordsActive.as_view(), name='user_records_active'),
    path('services/', ListServices.as_view(), name='services'),
    path('services/<int:pk>', ServicesDetail.as_view(), name='services_detail'),
    path('categories/', ListCategories.as_view(), name='categories'),
    path('categories/<int:pk>', CategoriesDetail.as_view(), name='categories_detail'),
    path('options/', ListOptions.as_view(), name='options'),
    path('options/<int:pk>', OptionsDetail.as_view(), name='options_detail'),
    path('records/', ListRecords.as_view(), name='records'),
    path('records/<int:pk>', RecordsDetail.as_view(), name='records_detail'),
    path('arrivals/', ListArrivals.as_view(), name='users_active'),
    path('arrivalsDate/<str:date>', ListArrivalsByDate.as_view(), name='arrivals_by_date'),
    path('arrivalsRecord/<int:record>', ListArrivalsByRecord.as_view(), name='arrivals_by_record'),
    path('arrival/<int:pk>', ArrivalsDetail.as_view(), name='arrivals_detail'),
]
