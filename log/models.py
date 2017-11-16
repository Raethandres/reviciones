from django.db import models
from django.contrib.auth.models import User

class UserModel(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
	log=models.BooleanField(default=False)

	def __str__(self):
		return str(self.user)


# Create your models here.
