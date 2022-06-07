from django.urls import path, include
from .views import CollectionViewSet, UserAuthViewSet, fetch_by_artist, fetch_events, fetch_by_artist_and_album, AddVinylViewSet, DeleteVinylView, DetailViewSet, fetch_tracklist
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'collection', CollectionViewSet, basename='collection')
router.register(r'login', UserAuthViewSet, basename='login')
urlpatterns = [
    path('', include(router.urls)),
    path('fetch-by-artist/<str:artist>', fetch_by_artist, name="fetch-by-artist"),
    path('fetch-events/<str:artist>', fetch_events, name="fetch-events"),
    path('fetch-by-artist-and-album/<str:artist_and_album>', fetch_by_artist_and_album, name="fetch-by-artist-and-album"),
    path('add-vinyl/<str:email>', AddVinylViewSet.as_view(), name="add-vinyl"),
    path('delete-vinyl/<int:vinyl_id>', DeleteVinylView.as_view(), name="delete-vinyl"),
    path('detail/<int:vinyl_id>', DetailViewSet.as_view(), name="detail"),
    path('fetch-tracklist/<str:artist>/<str:album>', fetch_tracklist, name="fetch-tracklist"),
]

