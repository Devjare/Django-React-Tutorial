from django.db import models
import string
import random


def generate_unique_code():
    length = 6

    while True:
        code = "".join(random.choices(string.ascii_uppercase, k=length))
        if Room.objects.filter(code=code).count() == 0:
            break

    return code


# Create your models here.
class Room(models.Model):
    code: models.CharField = models.CharField(
        max_length=8, default=generate_unique_code, unique=True
    )
    host: models.CharField = models.CharField(max_length=50, unique=True)
    guest_can_pause: models.BooleanField | bool = models.BooleanField(
        null=False, default=True
    )
    votes_to_skip: models.IntegerField | int = models.IntegerField(
        null=False, default=1
    )
    created_at: models.DateTimeField = models.DateTimeField(auto_now_add=True)
