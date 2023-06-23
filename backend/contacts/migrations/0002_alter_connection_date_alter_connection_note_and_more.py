# Generated by Django 4.2.2 on 2023-06-10 09:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contacts', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='connection',
            name='date',
            field=models.DateField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='connection',
            name='note',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AlterField(
            model_name='contact',
            name='next_connection',
            field=models.DateField(blank=True),
        ),
        migrations.AlterField(
            model_name='contact',
            name='note',
            field=models.CharField(blank=True, max_length=200),
        ),
    ]
