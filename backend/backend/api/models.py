from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    IDUser = models.CharField(max_length=5, blank=True)
    phone = models.CharField(max_length=50, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    deleted = models.BooleanField(default=0, blank=True)
    debt = models.CharField( max_length=20, default=0, blank=True)

    def __str__(self):
        return self.first_name + ' ' + self.last_name

    def have_debt(self):
        not_paid = Records.objects.filter(userObj=self.id, paid=True)
        sum = 0
        for i in not_paid:
            sum += not_paid.nett_price
        self.debt = sum + " kn"
        self.save()


class Services(models.Model):
    service = models.CharField(max_length=50)
    deleted = models.BooleanField(default=0, blank=True)

    def __str__(self):

        return self.service

class Categories(models.Model):
    category = models.CharField(max_length=50)
    serviceID = models.ForeignKey(Services, related_name='categories', on_delete=models.CASCADE)
    deleted = models.BooleanField(default=0, blank=True)

    def __str__(self):

        return self.category

class Options(models.Model):
    arrivals = models.IntegerField()
    price = models.IntegerField()
    duration = models.IntegerField()
    categoryID = models.ForeignKey(Categories, related_name='options', on_delete=models.CASCADE)
    deleted = models.BooleanField(default=0, blank=True)

    def __str__(self):

        return str(self.arrivals)

class Records(models.Model):
    userObj = models.ForeignKey(CustomUser, related_name='user_records', on_delete=models.CASCADE, null=True)
    serviceObj = models.ForeignKey(Services, related_name='service_records', on_delete=models.CASCADE, null=True)
    categoryObj = models.ForeignKey(Categories, related_name='category_records', on_delete=models.CASCADE, null=True)
    optionObj = models.ForeignKey(Options, related_name='options_records', on_delete=models.CASCADE, null=True)
    arrivals_left = models.IntegerField()
    price = models.IntegerField()
    discount = models.IntegerField()
    nett_price = models.IntegerField()
    paid = models.BooleanField(default=0)
    started = models.DateField(auto_now_add=True)
    ends = models.DateField()
    days_left = models.IntegerField()
    deleted = models.BooleanField(default=0, blank=True)
    active = models.BooleanField(default=1, blank=True)

    def is_active(self):
        if self.arrivals_left == 0:
            self.active = 0
            self.save()
        else:
            self.active = 1
            self.save()

    @property
    def user(self):
        return self.userObj.first_name + ' ' + self.userObj.last_name

class Arrivals(models.Model):
    userObj = models.ForeignKey(CustomUser, related_name='user_arrivals', on_delete=models.CASCADE, null=True)
    recordObj = models.ForeignKey(Records, related_name='record_arrivals', on_delete=models.CASCADE, null=True)
    arrival = models.DateTimeField()
    arrival_time = models.TimeField(max_length=10)
