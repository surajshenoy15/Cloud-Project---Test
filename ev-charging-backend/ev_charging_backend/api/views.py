from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import EVStation, Booking
from .serializers import EVStationSerializer, BookingSerializer

# ✅ GET Latest 10 Stations & POST New Station
@api_view(['GET', 'POST'])
def get_ev_stations(request):
    if request.method == 'GET':
        stations = EVStation.objects.all().order_by('-id')[:10]
        if not stations.exists():
            return Response({"error": "No stations available"}, status=status.HTTP_404_NOT_FOUND)

        serializer = EVStationSerializer(stations, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        serializer = EVStationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ✅ GET, UPDATE & DELETE Single Station
@api_view(['GET', 'PUT', 'DELETE'])
def station_detail(request, id):
    try:
        station = EVStation.objects.get(id=id)
    except EVStation.DoesNotExist:
        return Response({"error": "Station not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        return Response(EVStationSerializer(station).data)

    elif request.method == 'PUT':
        serializer = EVStationSerializer(station, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        station.delete()
        return Response({"message": "Station deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

# ✅ BOOK A SLOT (Prevents Overlapping)
@api_view(['POST'])
@permission_classes([IsAuthenticated])  # Require authentication
def book_slot(request, station_id):
    try:
        station = EVStation.objects.get(id=station_id)
    except EVStation.DoesNotExist:
        return Response({"error": "Station not found"}, status=status.HTTP_404_NOT_FOUND)

    if station.available_slots <= 0:
        return Response({"error": "No available slots"}, status=status.HTTP_400_BAD_REQUEST)

    request.data['station'] = station.id
    request.data['user'] = request.user.id  # Use authenticated user

    serializer = BookingSerializer(data=request.data)

    if serializer.is_valid():
        slot_number = serializer.validated_data.get("slot_number")
        start_time = serializer.validated_data.get("start_time")
        end_time = serializer.validated_data.get("end_time")

        # Prevent overlapping bookings
        overlapping = Booking.objects.filter(
            station=station, 
            slot_number=slot_number,  
            start_time__lt=end_time, 
            end_time__gt=start_time, 
            status="booked"
        ).exists()

        if overlapping:
            return Response(
                {"error": f"Slot {slot_number} is already booked during this time"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Save booking & update slots
        serializer.save()
        station.update_availability()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ✅ CANCEL A BOOKING
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def cancel_booking(request, booking_id):
    try:
        booking = Booking.objects.get(id=booking_id, user=request.user)
    except Booking.DoesNotExist:
        return Response({"error": "Booking not found or unauthorized"}, status=status.HTTP_404_NOT_FOUND)

    station = booking.station
    booking.delete()
    station.update_availability()

    return Response({"message": "Booking canceled successfully"}, status=status.HTTP_200_OK)

# ✅ GET USER BOOKINGS
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_bookings(request):
    bookings = Booking.objects.filter(user=request.user).order_by('-start_time')
    if not bookings.exists():
        return Response({"error": "No bookings found for this user"}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = BookingSerializer(bookings, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

# ✅ GET ALL BOOKINGS (Admin Only)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_bookings(request):
    if not request.user.is_staff:
        return Response({"error": "Unauthorized access"}, status=status.HTTP_403_FORBIDDEN)

    bookings = Booking.objects.all().order_by('-start_time')
    if not bookings.exists():
        return Response({"error": "No bookings found"}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = BookingSerializer(bookings, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
                            