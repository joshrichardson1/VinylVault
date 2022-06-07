from .models import User, Vinyl
from .serializers import UserSerializer, UserAuthSerializer, AddVinylSerializer, DeleteVinylSerializer, VinylSerializer
from rest_framework import viewsets, generics, mixins
from rest_framework.response import Response
import requests
from rest_framework.decorators import api_view
from decouple import config


# API for User's Collections
class CollectionViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    def get_queryset(self):
        queryset = User.objects.all()
        user_email = self.request.query_params.get('email', None)
        if user_email is not None:
            queryset = queryset.filter(email=user_email)
        return queryset

class DetailViewSet(generics.ListAPIView):
    serializer_class = VinylSerializer
    def get_queryset(self):
        vinyl_id = self.kwargs['vinyl_id']
        queryset = Vinyl.objects.filter(id=vinyl_id)
        return queryset

# API for to confirm user's PW
class UserAuthViewSet(viewsets.ModelViewSet):
    serializer_class = UserAuthSerializer
    def get_queryset(self):
        queryset = User.objects.all()
        user_email = self.request.query_params.get('email', None)
        if user_email is not None:
            queryset = queryset.filter(email=user_email)
        return queryset

# API to allow User's to add vinyl's to their collection
class AddVinylViewSet(generics.RetrieveUpdateAPIView):
    serializer_class = AddVinylSerializer
    lookup_url_kwarg = 'email'
    lookup_field = 'email'
    queryset = User.objects.all()

# API to delete User's vinyl from their collection
class DeleteVinylView(mixins.DestroyModelMixin, generics.RetrieveAPIView):
    serializer_class = DeleteVinylSerializer
    lookup_url_kwarg = 'vinyl_id'
    lookup_field = 'id'
    queryset = Vinyl.objects.all()

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

# Discogs API -- Search for artist
@api_view(['GET'])
def fetch_by_artist(request, artist):
    KEY = config('DISCOGS_KEY')
    SECRET = config('DISCOGS_SECRET')
    url = f"https://api.discogs.com/database/search?type=artist&q={artist}&key={KEY}&secret={SECRET}"
    response = requests.get(url)
    data = response.json()
    return Response(data)

# Discogs API -- Search by Artist and Album
@api_view(['GET'])
def fetch_by_artist_and_album(request, artist_and_album):
    KEY = config('DISCOGS_KEY')
    SECRET = config('DISCOGS_SECRET')
    url = f"https://api.discogs.com/database/search?type=title&q={artist_and_album}&key={KEY}&secret={SECRET}"
    response = requests.get(url)
    data = response.json()
    return Response(data)

# Bandsintown API -- Retrieve events by Artist
@api_view(['GET'])
def fetch_events(request, artist):
    KEY = config('BIT_KEY')
    url = f"https://rest.bandsintown.com/artists/{artist}/events/?app_id={KEY}"
    response = requests.get(url)
    data = response.json()
    return Response(data)

# LastFM API -- Retrieve tracklist for albums
@api_view(['GET'])
def fetch_tracklist(request, artist, album):
    KEY = config('LAST_FM_KEY')
    url = f"http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key={KEY}&artist={artist}&album={album}&format=json"
    response = requests.get(url)
    data = response.json()
    return Response(data)
