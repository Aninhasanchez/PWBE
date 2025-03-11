from django.db import models

class Cadastro(models.Model):
    ni = models.CharField(max_length=15)
    nome = models.CharField(max_length=255)
    email = models.EmailField()
    cel = models.CharField(max_length=255)
    ocup = models.FloatField()
    
class Disciplinas(models.Model):
    sigla = models.CharField(max_length=15)
    curso = models.CharField(max_length=255)
    semestre = models.CharField(max_length=50)
    cargaHoraria = models.CharField(max_length=255)
