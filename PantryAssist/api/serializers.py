from rest_framework import serializers
from .models import *


class CaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Case
        fields = ('id', 'first_name', 'last_name', 'preferred_name', 'email', 'age')

# class CreateCaseSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Case
#         fields = ('id', 'first_name', 'last_name', 'preferred_name', 'email', 'age')

class VolunteerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Volunteer
        fields = ('id', 'first_name', 'last_name', 'preferred_name', 'email')

class PackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Package
        fields = ('id', 'type', 'session', 'client')

    def create(self, validated_data):
        session_id = validated_data.pop('session_id')
        client_id = validated_data.pop('client_id')
        type = validated_data.pop('type')
        session = Session.objects.get(pk=session_id)
        client = Case.objects.get(pk=client_id)
        package = Package(type=type, session=session, client=client)
        package.save()
        return package

class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = ('id', 'start_date', 'end_date', 'in_progress')

class EndSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = ('id',)

class ShiftSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shift
        fields = ('id', 'start', 'end', 'volunteer')


