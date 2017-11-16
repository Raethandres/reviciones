from .models import alumnoModel,workModel,profesorModel
from django.shortcuts import render
from django.contrib.auth.models import User
from log.decorator import login_required,log
from django.contrib.auth import authenticate,login,logout
import json
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse,HttpResponse

@csrf_exempt
@login_required
def profesor(request):
	if request.method == "GET":
		try:
			print(request.GET["data"],"2222222222")
			work=workModel.objects.get(id_w=request.GET["data"])
			print(work,"work")
			alm=work.alumno.all()
			print(alm)
			alm.order_by('date','link')
			print(alm)
			vec=[(i.name,i.cedula,i.surname,i.note,i.link,i.check,i.points,i.date)for i in alm]
			print(alm[len(alm)-1].check)
			return JsonResponse({"status":True,"work":vec})
		except Exception as e:
			print(e)
			user=log()
			print(user)
			t=profesorModel.objects.filter(id_a=user.profesormodel.id_a)
			w=t[0].workmodel_set.all()
			vec=[(i.name,i.id_w)for i in w]
			return JsonResponse({"status":True,"work":vec,"name":user.profesormodel.name})
			

	return JsonResponse({"status":False})

def getProfesor(request):
	if request.method=='GET':
		t=profesorModel.objects.all()
		vec=[(t[i].name,t[i].id_a)for i in range(len(t))]
		print(vec)
		return JsonResponse({"status":True,"profesor":vec})
@csrf_exempt
def getWork(request):
	if request.method=='GET' and request.GET["data"]!="0":

		t=profesorModel.objects.filter(id_a=request.GET["data"])
		w=t[0].workmodel_set.all()
		vec=[(i.name,i.id_w)for i in w]
		# print(vec)
		# vec=[[x.name]for x in vec]
		# print(vec)
		return JsonResponse({"status":True,"work":vec})
	elif request.method=='POST':
		print("post",request.POST)
		r=workModel.objects.get(id_w=request.POST["d"])
		print(r.can)
		return JsonResponse({"status":True,"max":r.can})
	else:
		return JsonResponse({"status":False})
		# if request.method=="GET":

@csrf_exempt
def prueba(request):
	if request.method=='POST':
		data=request.POST
		po=profesorModel.objects.filter(id_a=log().profesormodel.id_a)
		pr=workModel(name=data["evento"],profesor=po[0],can=data["cantidad"])
		pr.save()
		return JsonResponse({"status":True})

@csrf_exempt
def check(request):
	if request.method=='POST':
		print("aja")
		data=request.POST
		al=alumnoModel.objects.get(cedula=data["identity"])
		al.points=data["point"]
		al.save()
		return JsonResponse({"status":True})

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
					al=alumnoModel(name=data["name"+str(c)],surname=data["surname"+str(c)],cedula=data["identity"+str(c)],note="dsds",link=data["repo"+str(0)],check=False,points=0)
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
