from django.conf.urls import include, url
from . import views 

urlpatterns= [
		# url(r'^accounts/', include('django.contrib.auth.urls')),
		url(r'^login/$', views.logi,name="login"),
		url(r'^count/$', views.count,name="count"),
		# url(r'^logup/$',views.logup,name="logup"),
		url(r'^logout/$', views.logot,name="logout"),


	]