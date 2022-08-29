from django.urls import path

from . import views
from .views import *

urlpatterns = [
    path('all_cases', AllCaseView.as_view()),
    path('case', CaseView.as_view()),
    path('case/<int:id>', CaseView.as_view()),
    path('all_volunteers', AllVolunteerView.as_view()),
    path('volunteer', VolunteerView.as_view()),
    path('volunteer/<int:id>', VolunteerView.as_view()),
    path('csrf', CSRFTokenView.as_view()),
    path('package', PackageView.as_view()),
    path('package/<int:session_id>', PackageView.as_view()),
    path('start_session', StartSessionView.as_view()),
    path('end_session', EndSessionView.as_view()),
    path('all_sessions', AllSessionView.as_view()),
    path('session', SessionView.as_view()),
    path('shift', ShiftView.as_view()),
    path('shift/<int:volunteer_id>', ShiftView.as_view()),
]