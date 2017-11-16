from django.contrib import admin
from .models import alumnoModel,workModel,profesorModel
from log.models import UserModel

admin.site.register(alumnoModel)
admin.site.register(workModel)
admin.site.register(profesorModel)
admin.site.register(UserModel)


# Register your models here.
