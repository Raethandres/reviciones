from django.shortcuts import render
from .forms import *
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate,login,logout
import json
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse,HttpResponse

client=None

@csrf_exempt
def logi(request):
	print("ss")
	# if request.method == 'GET':
	# 	return JsonResponse({'status':True})
	if request.method == "POST":
		# form = LoginForm(request.POST)
		print(request.POST)
		rq=request.POST
		# data=json.loads(request.POST['json_'])
		# print(form)
		# return JsonResponse({'status':True})

		if rq:
			try:
				user=User.objects.get(username=rq['user'])
				print(user,"s")
				st=authenticate(username=rq['user'],password=rq['pw'])
				print(st,"w")
				if st is not None:
					if st.is_active:
						login(request,st)
						client=st
						lin=True
						print(st,"j")
						return JsonResponse({'status':True})
					else:
						return JsonResponse({'status':False,'st':'not activate'})

				else:
					print(st,"f")					
					lin=False
					return JsonResponse({'status':False,'st':'notpaswo'})
			except Exception as e:
				lin=False
				print(e)
				return JsonResponse({'status':False,'st':'notfound'})
	# print(request)
	# form=LoginForm()
	return JsonResponse({'status':False})

def logup(request):
	if request.method == "POST":
		form = LogupForm(request.POST)
		if form.is_valid():
			user, created = User.objects.get_or_create(username=form.cleaned_data['user'], email=None)
			if not created:
				user.set_password(form.cleaned_data['pw'])
				user.save()
				lin=True
				return render(request, 'log/logup.html',{'form':form,'lin':lin})
	
	form = LogupForm()
	return render(request, 'log/logup.html',{})
# Create your views here.
@login_required(login_url="/login/")
@csrf_exempt
def count(request):
	print("puta")
	return JsonResponse({'status':True})

@login_required(login_url="/login/")
@csrf_exempt
def logot(request):
	if request.method=="POST":
		print("wswsp")
		logout(request)
		return JsonResponse({'status':True})
	else:
		return JsonResponse({'status':False})
