# Generated by Django 4.2.2 on 2023-06-10 09:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Contact',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('next_connection', models.DateField()),
                ('note', models.CharField(max_length=200)),
                ('cadence', models.CharField(choices=[('monthly', 'Monthly'), ('quarterly', 'Quarterly'), ('semiannually', 'Semiannually'), ('annually', 'Annually')], default='annually', max_length=20)),
                ('contact_method', models.CharField(choices=[('email', 'Email'), ('facebook', 'Facebook'), ('signal', 'Signal'), ('text', 'Text'), ('phonecall', 'Phonecall')], default='email', max_length=20)),
                ('state', models.CharField(choices=[('active', 'Active'), ('archived', 'Archived')], default='active', max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Connection',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('note', models.CharField(max_length=200)),
                ('contact', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='contacts.contact')),
            ],
        ),
    ]
