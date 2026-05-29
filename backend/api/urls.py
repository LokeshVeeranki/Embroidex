from django.urls import path
from . import views

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('login/', views.login, name='login'),
    path('users/', views.users_list, name='users_list'),
    path('machines/', views.machines_list, name='machines_list'),
    path('machines/<int:machine_id>/', views.machine_detail, name='machine_detail'),
    path('admin/machines/', views.admin_machines_list, name='admin_machines_list'),
    path('admin/machines/<int:machine_id>/approve/', views.approve_machine, name='approve_machine'),
    path('contact/', views.contact_list, name='contact_list'),
    path('contact/<int:contact_id>/', views.contact_detail, name='contact_detail'),
]