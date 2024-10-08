# Generated by Django 5.1.1 on 2024-09-19 17:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contacts', '0009_alter_connection_note'),
    ]

    operations = [
        migrations.AlterField(
            model_name='contact',
            name='contact_method',
            field=models.CharField(choices=[('email', 'Email'), ('facebook', 'Facebook'), ('signal', 'Signal'), ('text', 'Text'), ('phonecall', 'Phonecall'), ('discord', 'Discord'), ('linkedin', 'LinkedIn'), ('whatsapp', 'WhatsApp')], default='email', max_length=20),
        ),
    ]
