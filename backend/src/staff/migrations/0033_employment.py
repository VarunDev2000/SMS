# Generated by Django 2.2.6 on 2019-11-20 12:10

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('staff', '0032_auto_20191120_1410'),
    ]

    operations = [
        migrations.CreateModel(
            name='employment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('designation', models.CharField(max_length=400)),
                ('from_date', models.DateField(default=None, null=True)),
                ('to_date', models.DateField(default=None, null=True)),
                ('department', models.CharField(default=None, max_length=400, null=True)),
                ('campus', models.CharField(default=None, max_length=400, null=True)),
                ('present_pay', models.IntegerField(default=None, null=True)),
                ('nature_of_app', models.CharField(default=None, max_length=400, null=True)),
                ('position', models.CharField(default=None, max_length=400, null=True)),
                ('position_type', models.CharField(default=None, max_length=400)),
                ('institution', models.CharField(default=None, max_length=400, null=True)),
                ('years', models.CharField(default=None, max_length=400, null=True)),
                ('exp_type', models.CharField(default=None, max_length=400, null=True)),
                ('emp_type', models.CharField(default=None, max_length=200)),
                ('staff', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='employment', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name_plural': 'Employment details',
            },
        ),
    ]
