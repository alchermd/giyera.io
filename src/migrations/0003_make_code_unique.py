# Generated by Django 3.2.5 on 2021-08-13 04:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('src', '0002_create_game_model'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='code',
            field=models.CharField(max_length=255, unique=True),
        ),
    ]
