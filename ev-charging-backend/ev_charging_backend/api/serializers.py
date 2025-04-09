from rest_framework import serializers
from django.utils.timezone import now
from .models import EVStation, Booking

class EVStationSerializer(serializers.ModelSerializer):
    """Serializer for EV charging stations."""
    class Meta:
        model = EVStation
        fields = '__all__'


class BookingSerializer(serializers.ModelSerializer):
    """Serializer for booking a charging slot."""

    class Meta:
        model = Booking
        fields = '__all__'

    def validate(self, data):
        """Custom validation to ensure the slot is available before booking."""
        station = data.get('station')
        slot_number = data.get('slot_number')
        start_time = data.get('start_time')
        end_time = data.get('end_time')

        # 1️⃣ Ensure slot number is valid
        if slot_number < 1 or slot_number > station.total_slots:
            raise serializers.ValidationError({"slot_number": "Invalid slot number."})

        # 2️⃣ Ensure start_time is before end_time
        if start_time >= end_time:
            raise serializers.ValidationError({"time_error": "Start time must be before end time."})

        # 3️⃣ Ensure booking is not in the past
        if start_time < now():
            raise serializers.ValidationError({"time_error": "Booking cannot be in the past."})

        # 4️⃣ Ensure slot is available (no overlapping bookings)
        overlapping_bookings = Booking.objects.filter(
            station=station,
            slot_number=slot_number,
            start_time__lt=end_time,  # Existing booking starts before the requested booking ends
            end_time__gt=start_time,  # Existing booking ends after the requested booking starts
            status="booked"
        )

        if overlapping_bookings.exists():
            raise serializers.ValidationError({"slot_error": "Slot is already booked for the selected time."})

        return data
