from django.urls import path
from .views import listar_professores, ProfessoresView, ProfessoresDetailView, buscar_nome_professor, ProfessoresSearchView, DisciplinasDetailView, listar_disciplinas

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('professores', listar_professores),
    path('prof', ProfessoresView.as_view()),
    path('id/<int:pk>', ProfessoresDetailView.as_view()),
    path('buscar/nome/', buscar_nome_professor),
    path('search/', ProfessoresSearchView.as_view()),

    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),


    path('disciplinas', listar_disciplinas),
    path('disciplinas/id/<int:pk>', DisciplinasDetailView.as_view())
]

