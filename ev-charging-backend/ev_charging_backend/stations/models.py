from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class ChargingStation(models.Model):
    name = models.CharField(max_length=200)
    operator = models.CharField(max_length=200)
    latitude = models.FloatField()
    longitude = models.FloatField()
    address = models.TextField()
    charger_type = models.CharField(max_length=50, choices=[
        ('AC', 'AC Charging'),
        ('DC', 'DC Fast Charging')
    ])
    power_output = models.FloatField(help_text="Power output in kW")
    price_per_kwh = models.DecimalField(max_digits=6, decimal_places=2)
    available = models.BooleanField(default=True)
    total_ports = models.IntegerField(default=1)
    available_ports = models.IntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class StationReview(models.Model):
    station = models.ForeignKey(ChargingStation, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)])
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('station', 'user')