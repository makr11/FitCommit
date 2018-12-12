from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

class Setup(models.Model):
    name=models.CharField(max_length=30, primary_key=True)
    value=models.CharField(max_length=100)

class CustomUser(AbstractUser):
    IDUser = models.CharField(max_length=5, blank=True)
    phone = models.CharField(max_length=50, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    deleted = models.BooleanField(default=0, blank=True)

    def __str__(self):
        return self.first_name + ' ' + self.last_name

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
    days_left = models.IntegerField(default=0)
    deleted = models.BooleanField(default=0, blank=True)
    active = models.BooleanField(default=1, blank=True)
    price = models.IntegerField()
    discount = models.IntegerField()
    nett_price = models.IntegerField()
    paid = models.BooleanField(default=0)
    frozen = models.IntegerField(default=0)
    freeze_started = models.DateField(blank=True, null=True)
    freeze_ended = models.DateField(blank=True, null=True)
    started = models.DateField(auto_now_add=True)
    ends = models.DateField()

    def is_active(self):
        if self.arrivals_left == 0:
            self.active = 0
            self.save()
        else:
            self.active = 1
            self.save()
    
    def get_days_left(self):
        now = timezone.now().date()
        if self.ends > now:
            days_left = self.ends - now
            self.days_left = days_left.days
            self.save()
        else:
            self.days_left = 0
            self.save()

    def is_frozen(self):
        now = timezone.now().date()
        if self.freeze_ended == now:
            freeze_started = None
            freeze_ended = None
            self.save()

    @property
    def user(self):
        return self.userObj.first_name + ' ' + self.userObj.last_name

class Arrivals(models.Model):
    userObj = models.ForeignKey(CustomUser, related_name='user_arrivals', on_delete=models.CASCADE, null=True)
    recordObj = models.ForeignKey(Records, related_name='record_arrivals', on_delete=models.CASCADE, null=True)
    arrival = models.DateTimeField()
    arrival_time = models.TimeField(max_length=10)
