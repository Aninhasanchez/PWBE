# Generated by Django 5.1.5 on 2025-03-11 19:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Disciplinas',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sigla', models.CharField(max_length=15)),
                ('curso', models.CharField(max_length=255)),
                ('semestre', models.CharField(max_length=50)),
                ('cargaHoraria', models.CharField(max_length=255)),
            ],
        ),
    ]
