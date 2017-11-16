from django.conf.urls import include, url
from . import views 

urlpatterns= [
		# url(r'^accounts/', include('django.contrib.auth.urls')),
		url(r'^login/$', views.logi,name="login"),
		url(r'^count/$', views.count,name="count"),
		url(r'^falla/$',views.falla,name="falla"),
		url(r'^logout/$', views.logot,name="logout"),


	]