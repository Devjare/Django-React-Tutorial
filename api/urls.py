from django.urls import path, include
from .views import UserInRoom, main, RoomView, CreateRoomView, GetRoomView, JoinRoom

urlpatterns = [
    path("home/", main),
    path("rooms/", RoomView.as_view()),
    path("create-room", CreateRoomView.as_view()),
    path("get-room", GetRoomView.as_view()),
    path("join-room", JoinRoom.as_view()),
    path("user-in-room", UserInRoom.as_view()),
]
