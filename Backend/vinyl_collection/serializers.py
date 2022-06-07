from rest_framework import serializers
from .models import User, Vinyl 

class VinylSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vinyl
        fields = ['id', 'artist', 'album', 'genre', 'year', 'image', 'discogs_id', 'format', 'label', 'created_at', 'updated_at']

class UserSerializer(serializers.ModelSerializer):
    vinyls = VinylSerializer(many=True)

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'vinyls']

class UserAuthSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'password']

class AddVinylSerializer(serializers.ModelSerializer):
    vinyls = VinylSerializer(many=True)
    class Meta:
        model = User
        fields = ['vinyls']
    def create(self, validated_data):
        return User.vinyls.create(**validated_data)
    def update(self, instance, validated_data):
        vinyl_data = validated_data.pop('vinyls')
        
        for vinyl_data in vinyl_data:
            instance.vinyls.create(
                artist=vinyl_data['artist'],
                album=vinyl_data['album'],
                genre=vinyl_data['genre'],
                year=vinyl_data['year'],
                image=vinyl_data['image'],
                discogs_id=vinyl_data['discogs_id']
            )
        return instance

class DeleteVinylSerializer(serializers.ModelSerializer):

    class Meta:
        model = Vinyl
        fields = ['id']

    def delete(self, instance):
        instance.delete()
        return instance




        


    

    