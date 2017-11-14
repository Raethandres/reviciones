from django.conf.urls import include, url
from . import views 

urlpatterns= [
	url(r'^profesor/$', views.profesor,name="profesor"),
	url(r'^teach/$', views.getProfesor,name="teach"),
	url(r'^works/$', views.getWork,name="work"),
	url(r'^salum/$', views.alumnos,name="alumnos"),


	]