from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    phone = models.TextField(max_length=50, blank=True)
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