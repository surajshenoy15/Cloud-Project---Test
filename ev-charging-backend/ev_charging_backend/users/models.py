from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    phone_number = models.CharField(max_length=15, blank=True)
    reward_points = models.IntegerField(default=0)
    
class Vehicle(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    make = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    year = models.IntegerField()
    charging_type = models.CharField(max_length=50)
    license_plate = models.CharField(max_length=20)

class PaymentMethod(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    card_type = models.CharField(max_length=50)
    last_four = models.CharField(max_length=4)
    expiry_date = models.DateField()