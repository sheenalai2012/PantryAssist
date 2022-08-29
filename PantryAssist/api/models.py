from django.db import models


class Case(models.Model):
    first_name = models.CharField(null=True, max_length=200)
    last_name = models.CharField(null=True, max_length=200)
    preferred_name = models.CharField(null=True, max_length=200)
    email = models.EmailField(max_length=254, null=True)
    age = models.IntegerField(null=True)

class Session(models.Model):
    start_date = models.DateTimeField('start_date', null=True)
    end_date = models.DateTimeField('end_date', null=True)
    in_progress = models.BooleanField(default=True)

class Package(models.Model):
    type = models.CharField(max_length=200)
    client = models.ForeignKey(
        'Case',
        on_delete=models.CASCADE,
        default=-1
    )
    session = models.ForeignKey(
        'Session',
        on_delete=models.CASCADE,
        default=-1
    )

class Volunteer(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    preferred_name = models.CharField(max_length=200)
    email = models.EmailField(max_length=254, null=True)

class Shift(models.Model):
    volunteer = models.ForeignKey(
        'Volunteer',
        on_delete=models.CASCADE,
        default=-1
    )
    start = models.DateTimeField('start', null=True)
    end = models.DateTimeField('end', null=True)

class TimePeriod(models.Model):
    start = models.DateTimeField('start', null=True)
    end = models.DateTimeField('end', null=True)
    def overLapTimes(self, obj_start, obj_end):
        interval_start = obj_start
        interval_end = obj_end
        if (obj_start < self.start):
            interval_start = self.start
        if (obj_end > self.end):
            interval_end = self.end
        return (interval_start, interval_end)

# Create your models here.
