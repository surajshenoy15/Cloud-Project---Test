from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    get_ev_stations, station_detail, book_slot, cancel_booking, 
    user_bookings, get_all_bookings
)

urlpatterns = [
    # ✅ Authentication (JWT)
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Login (JWT Access & Refresh)
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Refresh Token

    # ✅ Stations
    path('stations/', get_ev_stations, name='get_ev_stations'),  # Fetch all stations & add new station
    path('stations/<int:id>/', station_detail, name='station_detail'),  # Fetch, update, delete a station
    path('stations/<int:station_id>/book/', book_slot, name='book_slot'),  # Book a slot

    # ✅ Bookings
    path('bookings/', get_all_bookings, name='get_all_bookings'),  # Fetch all bookings (Admin)
    path('bookings/user/', user_bookings, name='user_bookings'),  # Fetch authenticated user's bookings
    path('bookings/<int:booking_id>/', cancel_booking, name='cancel_booking'),  # Cancel booking
]
