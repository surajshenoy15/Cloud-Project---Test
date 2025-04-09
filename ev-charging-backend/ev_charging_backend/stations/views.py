from rest_framework import viewsets, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Avg
from .models import ChargingStation, StationReview
from .serializers import ChargingStationSerializer, StationReviewSerializer

class ChargingStationViewSet(viewsets.ModelViewSet):
    queryset = ChargingStation.objects.all()
    serializer_class = ChargingStationSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'address', 'charger_type']

    @action(detail=True, methods=['post'])
    def toggle_availability(self, request, pk=None):
        station = self.get_object()
        station.available = not station.available
        station.save()
        return Response({'status': 'success'})

    @action(detail=True, methods=['get'])
    def reviews(self, request, pk=None):
        station = self.get_object()
        reviews = station.stationreview_set.all()
        average_rating = reviews.aggregate(Avg('rating'))['rating__avg']
        serializer = StationReviewSerializer(reviews, many=True)
        return Response({
            'reviews': serializer.data,
            'average_rating': average_rating
        })