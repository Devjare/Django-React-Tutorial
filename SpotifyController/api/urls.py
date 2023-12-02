from django.urls import path, include
from .views import main, RoomView

urlpatterns = [
    path('home/', main),
    path('rooms/', RoomView.as_view())
]
