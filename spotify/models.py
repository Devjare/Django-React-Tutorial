from django.db import models
from api.models import Room


class SpotifyToken(models.Model):
    user: models.CharField = models.CharField(max_length=50, unique=True)
    created_at: models.DateTimeField = models.DateTimeField(auto_now_add=True)
    refresh_token: models.CharField = models.CharField(max_length=150)
    access_token: models.CharField = models.CharField(max_length=150)
    expires_in: models.DateTimeField = models.DateTimeField()
    token_type: models.CharField = models.CharField(max_length=150)

    def __str__(self):
        meta = """
        user: {user},
        created_at: {created_at},
        refresh_token: {refresh_token},
        access_token: {access_token},
        expires_in: {expires_in},
        token_type: {token_type}
        """
        meta = meta.format(user=self.user, created_at=self.created_at,
                           refresh_token=self.refresh_token,
                           access_token=self.access_token,
                           expires_in=self.expires_in,
                           token_type=self.token_type)
        return meta

class Vote(models.Model):
    user: models.CharField = models.CharField(max_length=50, unique=True)
    created_at: models.DateTimeField = models.DateTimeField(auto_now_add=True)
    song_id: models.CharField = models.CharField(max_length=50) 
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
