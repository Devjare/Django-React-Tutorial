from django.urls import path, include
from .views import main, RoomView, CreateRoomView

urlpatterns = [
    path('home/', main),
    path('rooms/', RoomView.as_view()),
    path('create-room/', CreateRoomView.as_view())
]
