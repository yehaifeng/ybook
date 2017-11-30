from django.db import models

# Create your models here.
class BOOK_INFO(models.Model):
    id = models.IntegerField(unique=True, auto_created=True)
    name = models.CharField(max_length=)