# Generated by Django 2.2.6 on 2019-11-24 06:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('staff', '0042_auto_20191124_0220'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ext_and_outreach_prog',
            name='cross_sec_of_participants',
            field=models.CharField(default=None, max_length=800),
        ),
        migrations.AlterField(
            model_name='ext_and_outreach_prog',
            name='no_of_participants',
            field=models.IntegerField(default=None),
        ),
        migrations.AlterField(
            model_name='ext_and_outreach_prog',
            name='your_role',
            field=models.CharField(default=None, max_length=400),
        ),
    ]
