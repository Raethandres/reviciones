# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-11-12 11:31
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('control', '0002_auto_20171112_1109'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profesormodel',
            name='work',
        ),
        migrations.AddField(
            model_name='workmodel',
            name='work',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='control.profesorModel'),
            preserve_default=False,
        ),
    ]
