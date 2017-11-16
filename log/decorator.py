from .models import UserModel
from django.shortcuts import redirect
def login_required(function):

	def wrapper(*args, **kwargs):
		try:
			user=UserModel.objects.get(log=True)
			return function(*args, **kwargs)
		except Exception as e:
			print(e)
			return redirect('falla')

	return wrapper

def login(user):
	user.usermodel.log=True
	user.save()
	

def log():
	try:
		user=UserModel.objects.get(log=True)
		return user
	except Exception as e:
		print(e)
		return None