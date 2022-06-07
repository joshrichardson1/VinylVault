from django.db import models


class User(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Vinyl(models.Model):
    artist = models.CharField(max_length=255)
    album = models.CharField(max_length=255)
    genre = models.CharField(max_length=255, blank=True, null=True)
    year = models.IntegerField(blank=True, null=True)
    image = models.URLField(max_length=255, blank=True, null=True)
    format = models.CharField(max_length=255, blank=True, null=True)
    label = models.CharField(max_length=255, blank=True, null=True) 
    discogs_id = models.IntegerField(blank=True, null=True)
    created_at = models.DateField(auto_now_add=True, )
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ManyToManyField(User, related_name="vinyls")

    class Meta:
        ordering = ('artist', 'album')

    def __str__(self):
        return f"{self.artist} - {self.album}"

