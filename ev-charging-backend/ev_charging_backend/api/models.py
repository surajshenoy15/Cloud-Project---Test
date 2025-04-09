from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now

class EVStation(models.Model):
    """Model for EV charging stations."""
    name = models.CharField(max_length=100)
    latitude = models.FloatField()
    longitude = models.FloatField()
    total_slots = models.IntegerField()
    available_slots = models.IntegerField()

    def update_availability(self):
        """Update available slots based on active bookings."""
        booked_slots = Booking.objects.filter(station=self, status="booked").count()
        self.available_slots = max(0, self.total_slots - booked_slots)
        self.save()

    def __str__(self):
        return f"{self.name} - Available Slots: {self.available_slots}"


class Booking(models.Model):
    """Model for booking an EV charging slot."""
    
    STATUS_CHOICES = [
        ("booked", "Booked"),
        ("cancelled", "Cancelled"),
    ]

    station = models.ForeignKey(EVStation, on_delete=models.CASCADE, related_name="bookings")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    slot_number = models.IntegerField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="booked")

    def save(self, *args, **kwargs):
        """Override save to update station slot availability."""
        if self.status == "booked":
            # Prevent double-booking
            overlapping_bookings = Booking.objects.filter(
                station=self.station,
                slot_number=self.slot_number,
                start_time__lt=self.end_time,
                end_time__gt=self.start_time,
                status="booked"
            ).exclude(id=self.id)

            if overlapping_bookings.exists():
                raise ValueError("This slot is already booked for the selected time.")

        super().save(*args, **kwargs)
        self.station.update_availability()

    def delete(self, *args, **kwargs):
        """Override delete to restore slot availability when booking is canceled."""
        super().delete(*args, **kwargs)
        self.station.update_availability()

    def __str__(self):
        return f"Slot {self.slot_number} at {self.station.name} - {self.status}"
