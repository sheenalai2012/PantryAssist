from django.shortcuts import render
from rest_framework import generics, status
from .serializers import *
from .models import *
from rest_framework.views import APIView
from rest_framework.response import Response
from django.middleware import csrf
from datetime import datetime
# Create your views here.

class AllCaseView(generics.ListAPIView):
    queryset = Case.objects.all()
    serializer_class = CaseSerializer

class CaseView(APIView):
    serializer_class = CaseSerializer

    def get(self, request, id='', format=None):
        case = Case.objects.get(pk=id)
        return Response(CaseSerializer(case).data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            first_name = serializer.data.get('first_name')
            last_name = serializer.data.get('last_name')
            preferred_name = serializer.data.get('preferred_name')
            email = serializer.data.get('email')
            age = serializer.data.get('age')
            case = Case(first_name=first_name, last_name=last_name, email=email, preferred_name=preferred_name, age=age)
            case.save()
            return Response(CaseSerializer(case).data, status=status.HTTP_201_CREATED)
        return Response({"Bad Request": "Invalid data"}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id='', format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            case = Case.objects.get(pk=id)
            case.first_name = serializer.data.get('first_name')
            case.last_name = serializer.data.get('last_name')
            case.preferred_name = serializer.data.get('preferred_name')
            case.email = serializer.data.get('email')
            case.age = serializer.data.get('age')
            case.save(update_fields=['first_name', 'last_name', 'preferred_name', 'email', 'age'])
            return Response(CaseSerializer(case).data, status=status.HTTP_200_OK)
        return Response({"Bad Request": "Invalid data"}, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id='', format=None):
        case = Case.objects.get(pk=id)
        case.delete()
        return Response(CaseSerializer(case).data, status=status.HTTP_200_OK)

class AllVolunteerView(generics.ListAPIView):
    queryset = Volunteer.objects.all()
    serializer_class = VolunteerSerializer

class VolunteerView(APIView):
    serializer_class = VolunteerSerializer

    def get(self, request, id='', format=None):
        volunteer = Volunteer.objects.get(pk=id)
        shifts = []
        for shift in Shift.objects.filter(volunteer=id):
            shifts.append(ShiftSerializer(shift).data)
        response = {
            "first_name": volunteer.first_name,
            "last_name": volunteer.last_name,
            "preferred_name": volunteer.preferred_name,
            "email": volunteer.email,
            "shifts": shifts
        }
        return Response(response, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            first_name = serializer.data.get('first_name')
            last_name = serializer.data.get('last_name')
            preferred_name = serializer.data.get('preferred_name')
            email = serializer.data.get('email')
            volunteer = Volunteer(first_name=first_name, last_name=last_name, email=email, preferred_name=preferred_name)
            volunteer.save()
            return Response(VolunteerSerializer(volunteer).data, status=status.HTTP_201_CREATED)
        return Response({"Bad Request": "Invalid data"}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id='', format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            volunteer = Volunteer.objects.get(pk=id)
            volunteer.first_name = serializer.data.get('first_name')
            volunteer.last_name = serializer.data.get('last_name')
            volunteer.preferred_name = serializer.data.get('preferred_name')
            volunteer.email = serializer.data.get('email')
            volunteer.save(update_fields=['first_name', 'last_name', 'preferred_name', 'email'])
            return Response(VolunteerSerializer(volunteer).data, status=status.HTTP_200_OK)
        return Response({"Bad Request": "Invalid data"}, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id='', format=None):
        volunteer = Volunteer.objects.get(pk=id)
        volunteer.delete()
        return Response(VolunteerSerializer(volunteer).data, status=status.HTTP_200_OK)

class CSRFTokenView(APIView):
    def get(self, request, format=None):
        return Response({'csrfmiddlewaretoken': csrf.get_token(request)})

class PackageView(APIView):
    def get(self, request, session_id='', format=None):
        if session_id == '':
            packages = Package.objects.all()
        else:
            packages = Package.objects.filter(session=session_id)
        response = []
        for package in packages:
            response.append(PackageSerializer(package).data)
        return Response(response, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        type = request.data['type']
        client = Case.objects.get(pk=request.data['client_id'])
        session = Session.objects.get(pk=request.data['session_id'])
        package = Package(type=type, client=client, session=session)
        package.save()
        return Response(PackageSerializer(package).data, status=status.HTTP_201_CREATED)

    def put(self, request, format=None):
        package = Package.objects.get(pk=request.data['id'])
        package.type = request.data['start']
        package.client = Case.objects.get(pk=request.data['client_id'])
        package.session = Session.objects.get(pk=request.data['session_id'])
        package.save(update_fields=['type', 'client', 'session'])
        return Response(PackageSerializer(package).data, status=status.HTTP_200_OK)
    
    def delete(self, request, format=None):
        package = Package.objects.get(pk=request.data['id'])
        package.delete()
        return Response(PackageSerializer(package).data, status=status.HTTP_200_OK)


class StartSessionView(APIView):
    def post(self, request, format=None):
        session = Session()
        session.start_date = datetime.now()
        session.in_progress = True
        session.save()
        return Response(SessionSerializer(session).data, status=status.HTTP_201_CREATED)

class EndSessionView(APIView):
    def post(self, request, format=None):
        session_id = request.data['id']
        session = Session.objects.get(pk=session_id)
        session.end_date = datetime.now()
        session.in_progress = False
        session.save(update_fields=['end_date', 'in_progress'])
        return Response(SessionSerializer(session).data, status=status.HTTP_200_OK)
    
class AllSessionView(generics.ListAPIView):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer

class SessionView(APIView):
    def delete(self, reqest, format=None):
        session = Session.objects.get(pk=reqest.data['id'])
        session.delete()
        return Response(SessionSerializer(session).data, status=status.HTTP_200_OK)

class ShiftView(APIView):
    serializer_class = ShiftSerializer

    def get(self, request, id = '', format=None):
        shift = Shift.objects.get(pk=id)
        return Response(ShiftSerializer(shift).data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        shift = Shift()
        # volunteer_id = request.data['volunteer_id']
        shift.start = request.data['start']
        shift.end = request.data['end']
        shift.volunteer = Volunteer.objects.get(pk=request.data['volunteer_id'])
        shift.save()
        return Response(ShiftSerializer(shift).data, status=status.HTTP_201_CREATED)
    
    def put(self, request, format=None):
        shift = Shift.objects.get(pk=request.data['id'])
        shift.start = request.data['start']
        shift.end = request.data['end']
        shift.volunteer = Volunteer.objects.get(pk=request.data['volunteer_id'])
        shift.save(update_fields=['start', 'end', 'volunteer'])
        return Response(ShiftSerializer(shift).data, status=status.HTTP_200_OK)
    
    def delete(self, request, format=None):
        shift = Shift.objects.get(pk=request.data['id'])
        shift.delete()
        return Response(ShiftSerializer(shift).data, status=status.HTTP_200_OK)








        
        

