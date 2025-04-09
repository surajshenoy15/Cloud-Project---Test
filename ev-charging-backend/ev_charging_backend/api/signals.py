# ev_finder/signals.py

from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import UserProfile, StationRating, ChargingStation
from django.db.models import Avg


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    """Create a UserProfile for every new User."""
    if created:
        UserProfile.objects.create(user=instance)


@receiver(post_save, sender=StationRating)
def update_station_rating(sender, instance, **kwargs):
    """Update the station's average rating when a new rating is added or updated."""
    station = instance.station
    
    # Calculate new average rating
    avg_rating = StationRating.objects.filter(station=station).aggregate(Avg('rating'))['rating__avg']
    total_ratings = StationRating.objects.filter(station=station).count()
    
    # Update the station
    station.average_rating = avg_rating
    station.total_ratings = total_ratings
    station.save()