# Generated by Django 3.1.5 on 2021-01-16 19:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('query', '0012_auto_20210115_2007'),
    ]

    operations = [
        migrations.AddField(
            model_name='teacheruser',
            name='section',
            field=models.CharField(default=None, max_length=5, unique=True),
        ),
        migrations.AlterField(
            model_name='teacheruser',
            name='lastloginat',
            field=models.DateTimeField(auto_now=True),
        ),
    ]