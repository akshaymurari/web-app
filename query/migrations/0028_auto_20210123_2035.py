# Generated by Django 3.1.5 on 2021-01-23 20:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('query', '0027_auto_20210120_1600'),
    ]

    operations = [
        migrations.AddField(
            model_name='links',
            name='attendance_taken',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='links',
            name='class_day',
            field=models.DateField(default='2021-01-23'),
        ),
    ]
