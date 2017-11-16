from .models import UserModel

def login_required(function):

	def wrapper(*args, **kwargs):
		try:
			user=UserModel.objects.get(log=True)
			return function(*args, **kwargs)
		except Exception as e:
			print(e)
			return redirect('falla')

	return wrapper
