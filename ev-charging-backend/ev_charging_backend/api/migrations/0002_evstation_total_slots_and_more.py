# Generated by Django 5.1.7 on 2025-03-13 15:35

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='evstation',
            name='total_slots',
            field=models.IntegerField(default=10),
        ),
        migrations.AlterField(
            model_name='evstation',
            name='available_slots',
            field=models.IntegerField(default=10),
        ),
        migrations.CreateModel(
            name='Booking',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('slot_number', models.IntegerField()),
                ('start_time', models.DateTimeField()),
                ('end_time', models.DateTimeField()),
                ('status', models.CharField(choices=[('booked', 'Booked'), ('available', 'Available')], default='booked', max_length=20)),
                ('station', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='bookings', to='api.evstation')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
