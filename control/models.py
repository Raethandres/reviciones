from django.db import models
from log.models import UserModel

class alumnoModel(models.Model):
	cedula=models.IntegerField()
	name=models.CharField(max_length=40)
	surname=models.CharField(max_length=40)
	note=models.CharField(max_length=144)
	link=models.URLField(max_length=40)
	check=models.BooleanField(False)
	points=models.IntegerField()
	date=models.DateTimeField(auto_now=True)

	def __str__(self):
		a=self.name+" "+self.surname
		return str(a)

class profesorModel(models.Model):
	id_a=models.AutoField(primary_key=True)
	name=models.CharField(max_length=20)
	use=models.OneToOneField(UserModel, on_delete=models.CASCADE, null=True)
	
	
	def __str__(self):
		return str(self.name)

class workModel(models.Model):
	id_w=models.AutoField(primary_key=True)
	name=models.CharField(max_length=20)
	alumno=models.ManyToManyField(alumnoModel,null=True)
	profesor=models.ForeignKey(profesorModel)
	
	def __str__(self):
		return str(self.name)





# Create your models here.
