from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    phone = models.CharField(max_length=50, blank=True)
    birth_date = models.DateField(null=True, blank=True)

class Services(models.Model):

    service = models.CharField(max_length=50)

    def __str__(self):

        return self.service

class Categories(models.Model):
    category = models.CharField(max_length=50)
    serviceID = models.ForeignKey(Services, related_name='categories', on_delete=models.CASCADE)

    def __str__(self):

        return self.category

class Options(models.Model):

    quantity = models.IntegerField()
    price = models.IntegerField()
    duration = models.IntegerField()
    categoryID = models.ForeignKey(Categories, related_name='options', on_delete=models.CASCADE)

    def __str__(self):

        return str(self.quantity)

class Records(models.Model):
    userObj = models.ForeignKey(CustomUser, related_name='user_records', on_delete=models.SET_NULL, null=True)
    servicesObj = models.ForeignKey(Services, related_name='services_records', on_delete=models.SET_NULL, null=True)
    categoriesObj = models.ForeignKey(Categories, related_name='category_records', on_delete=models.SET_NULL, null=True)
    optionsObj = models.ForeignKey(Options, related_name='options_records', on_delete=models.SET_NULL, null=True)
    user = models.CharField(max_length=50)
    service = models.CharField(max_length=50)
    category = models.CharField(max_length=50)
    quantity = models.IntegerField()
    quantity_left = models.IntegerField()
    price = models.CharField(max_length=10)
    discount = models.IntegerField()
    nett_price = models.IntegerField()
    paid = models.BooleanField(default=False)
    duration = models.IntegerField()
    started = models.DateField()
    ends = models.DateField()
    days_left = models.IntegerField()