from .models import UserModel
from django.shortcuts import redirect
def login_required(function):

	def wrapper(*args, **kwargs):
		try:
			user=UserModel.objects.filter(log=True)
			return function(*args, **kwargs)
		except Exception as e:
			print(e,"falla")
			return redirect('falla')

	return wrapper

def login(user):
	user.usermodel.log=True
	user.save()
	print(user,"save",user.usermodel.log)
	

def log():
	try:
		user=UserModel.objects.get(log=True)
		return user
	except Exception as e:
		print(e)
		return None

def logout():
	try:
		user=UserModel.objects.get(log=True)
		user.usermodel.log=False
		user.save()
		print(user,"save",user.usermodel.log)
		return user
	except Exception as e:
		print(e)
		return None