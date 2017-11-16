from .models import alumnoModel,workModel,profesorModel
from django.shortcuts import render
from django.contrib.auth.models import User
from log.decorator import login_required
from django.contrib.auth import authenticate,login,logout
import json
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse,HttpResponse

@csrf_exempt
@login_required
def profesor(request):
	if request.method == "GET":
		try:
			work=workModel.objects.get(id_w=request.GET["data"])
			alm=work.alumno.all()
			vec=[(i.name,i.cedula,i.surname,i.note,i.link,i.check,i.points,i.date)for i in alm]
		except Exception as e:
			t=profesorModel.objects.filter(id_a=1)
			w=t[0].workmodel_set.all()
			vec=[(i.name,i.id_w)for i in w]
			

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
