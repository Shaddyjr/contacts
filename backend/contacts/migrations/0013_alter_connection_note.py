# Generated by Django 4.2.2 on 2024-09-19 19:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contacts', '0012_alter_contact_note'),
    ]

    operations = [
        migrations.AlterField(
            model_name='connection',
            name='note',
            field=models.TextField(blank=True),
        ),
    ]