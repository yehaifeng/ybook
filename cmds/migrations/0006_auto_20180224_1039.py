# -*- coding: utf-8 -*-
# Generated by Django 1.11.9 on 2018-02-24 02:39
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cmds', '0005_auto_20180129_1401'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book_info',
            name='book_publish_date',
            field=models.DateField(auto_now=True, db_column='book_publish_date', null=True),
        ),
    ]
