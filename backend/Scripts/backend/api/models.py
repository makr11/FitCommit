from django.db import models
from django.contrib.auth.models import User

class Services(models.Model):

    service = models.CharField(max_length=50)

    def __str__(self):

        return self.service


class Category(models.Model):
    category = models.CharField(max_length=50)
    service = models.ForeignKey(Services, related_name='service', on_delete=models.CASCADE)

    def __str__(self):

        return self.category


class Options(models.Model):

    quantity = models.IntegerField()
    price = models.IntegerField()
    duration = models.IntegerField()
    category = models.ForeignKey(Category, related_name='category', on_delete=models.CASCADE)

    def __str__(self):

        return str(self.quantity)


class Records(models.Model):
    user = models.ForeignKey(User, related_name='user_records', on_delete=models.SET_NULL, null=True)
    service = models.CharField(max_length=50)
    category = models.CharField(max_length=50)
    quantity = models.IntegerField()
    price = models.IntegerField()
    duration = models.IntegerField()
    paid = models.BooleanField(default=False)
    started = models.DateField()
    ends = models.DateField()
    expire = models.IntegerField()

    def __str__(self):

        return format('{}, {} ({})', self. service, self. category, str(self.quantity))
    

class Arrivals(models.Model):
    user = models.ForeignKey(User, related_name='user_arrivals', on_delete=models.SET_NULL, null=True)
    recordsid = models.ForeignKey(Records, related_name='records_arrivals', on_delete=models.SET_NULL, null=True)
    service = models.CharField(max_length=50)
    category = models.CharField(max_length=50)
    arrival = models.DateTimeField()

    def __str__(self):

        return format('{}, {}', self. service, self. category)