from django.db import models

class UserModel(models.Model):
	id_u=models.AutoField(primary_key=True)
	name=models.CharField(max_length=20)

	def __str__(self):
		return str(self.name)


# Create your models here.
