from django.db import models


class SpotifyToken(models.Model):
    user = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    refresh_token = models.CharField(max_length=150)
    access_token = models.CharField(max_length=150)
    expires_in = models.DateTimeField()
    token_type = models.CharField(max_length=150)

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
