from .models import alumnoModel,workModel,profesorModel
from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate,login,logout
import json
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse,HttpResponse

@csrf_exempt
#@login_required(login_url="/login/")
def profesor(request):
	if request.method == "GET":
		work=workModel.objects.get(id_w=1)
		alm=work.alumno.all()
		vec=[(i.name,i.id_w)for i in alm]

	return JsonResponse({"status":True,"work":vec})

def getProfesor(request):
	if request.method=='GET':
		t=profesorModel.objects.all()
		vec=[(t[i].name,t[i].id_a)for i in range(len(t))]
		print(vec)
		return JsonResponse({"status":True,"profesor":vec})

def getWork(request):
	if request.method=='GET' and request.GET["data"]!="0":

		t=profesorModel.objects.filter(id_a=request.GET["data"])
		w=t[0].workmodel_set.all()
		vec=[(i.name,i.id_w)for i in w]
		# print(vec)
		# vec=[[x.name]for x in vec]
		# print(vec)
		return JsonResponse({"status":True,"work":vec})
	else:
		return JsonResponse({"status":False})
		# if request.method=="GET":

@csrf_exempt
def alumnos(request):
	if request.method=='POST':
		data=request.POST
		c=0
		while True:
			try:
				try:
					alumnoModel.objects.get(cedula=data["identity"+str(c)])
					c+=1
					print('paso')
				except Exception as e:
					al=alumnoModel(name=data["name"+str(c)],surname=data["surname"+str(c)],cedula=data["identity"+str(c)],note="dsds",link=data["repo"+str(c)],check=False,points=0)
					work=workModel.objects.get(id_w=int(data["evaluacion"]))
					al.save()
					work.alumno.add(al)
					c+=1
					print('fine')
				
			except Exception as e:
				print(e)
				break
			
		return JsonResponse({"status":True})
# Create your views here.