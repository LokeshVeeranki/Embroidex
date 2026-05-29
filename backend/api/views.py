from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import User, Machine, Contact
from .serializers import SignupSerializer, LoginSerializer, MachineSerializer, UserSerializer, ContactSerializer
from .utils import hash_password, verify_password, generate_token


@api_view(['GET'])
def users_list(request):
    users = User.objects.all().order_by('-created_at')
    serializer = UserSerializer(users, many=True)
    return Response({
        'success': True,
        'users': serializer.data
    }, status=status.HTTP_200_OK)

@api_view(['POST'])
def signup(request):
    serializer = SignupSerializer(data=request.data)
    if not serializer.is_valid():
        return Response({
            'success': False,
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    data = serializer.validated_data

    # Check duplicate email
    if User.objects.filter(email=data['email']).exists():
        return Response({
            'success': False,
            'message': 'Email already registered.'
        }, status=status.HTTP_409_CONFLICT)

    # Check duplicate mobile
    if User.objects.filter(mobile_number=data['mobile_number']).exists():
        return Response({
            'success': False,
            'message': 'Mobile number already registered.'
        }, status=status.HTTP_409_CONFLICT)

    # Role: only allow 'user' by default; 'admin' only if explicitly passed
    role = data.get('role', 'user')
    if role not in ['user', 'admin']:
        role = 'user'

    user = User.objects.create(
        first_name=data['first_name'],
        last_name=data['last_name'],
        email=data['email'],
        mobile_number=data['mobile_number'],
        password=hash_password(data['password']),
        role=role,
        status=1
    )

    return Response({
        'success': True,
        'message': 'Account created successfully.',
        'user': {
            'user_id': user.user_id,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'mobile_number': user.mobile_number,
            'role': user.role,
            'status': user.status,
        }
    }, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def login(request):
    serializer = LoginSerializer(data=request.data)
    if not serializer.is_valid():
        return Response({
            'success': False,
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    data = serializer.validated_data

    try:
        user = User.objects.get(email=data['email'])
    except User.DoesNotExist:
        return Response({
            'success': False,
            'message': 'Invalid email or password.'
        }, status=status.HTTP_401_UNAUTHORIZED)

    if user.status == 0:
        return Response({
            'success': False,
            'message': 'Your account is inactive. Contact support.'
        }, status=status.HTTP_403_FORBIDDEN)

    if not verify_password(data['password'], user.password):
        return Response({
            'success': False,
            'message': 'Invalid email or password.'
        }, status=status.HTTP_401_UNAUTHORIZED)

    token = generate_token(user)

    return Response({
        'success': True,
        'message': 'Login successful.',
        'token': token,
        'redirect': 'dashboard' if user.role == 'admin' else 'add-machine',
        'user': {
            'user_id': user.user_id,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'role': user.role,
            'status': user.status,
        }
    }, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
def machines_list(request):
    if request.method == 'GET':
        # Only show approved machines to public
        machines = Machine.objects.filter(is_active=True, approval_status='approved').order_by('-created_at')
        serializer = MachineSerializer(machines, many=True, context={'request': request})
        return Response({
            'success': True,
            'machines': serializer.data
        }, status=status.HTTP_200_OK)
    
    elif request.method == 'POST':
        serializer = MachineSerializer(data=request.data, context={'request': request})
        if not serializer.is_valid():
            return Response({
                'success': False,
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Set approval_status to pending by default
        machine = serializer.save(approval_status='pending')
        return Response({
            'success': True,
            'message': 'Machine submitted for approval. It will be visible once approved by admin.',
            'machine': serializer.data
        }, status=status.HTTP_201_CREATED)


@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
def machine_detail(request, machine_id):
    try:
        machine = Machine.objects.get(machine_id=machine_id)
    except Machine.DoesNotExist:
        return Response({
            'success': False,
            'message': 'Machine not found.'
        }, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        # Check if machine is active and approved for public access
        if not machine.is_active or machine.approval_status != 'approved':
            return Response({
                'success': False,
                'message': 'Machine not available.'
            }, status=status.HTTP_404_NOT_FOUND)
        serializer = MachineSerializer(machine, context={'request': request})
        return Response({
            'success': True,
            'machine': serializer.data
        }, status=status.HTTP_200_OK)
    
    elif request.method == 'PUT':
        print(f"PUT request data: {request.data}")
        print(f"PUT request FILES: {request.FILES}")
        serializer = MachineSerializer(machine, data=request.data, partial=True, context={'request': request})
        if not serializer.is_valid():
            print(f"Validation errors: {serializer.errors}")
            return Response({
                'success': False,
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        
        serializer.save()
        return Response({
            'success': True,
            'message': 'Machine updated successfully.',
            'machine': serializer.data
        }, status=status.HTTP_200_OK)
    
    elif request.method == 'PATCH':
        serializer = MachineSerializer(machine, data=request.data, partial=True, context={'request': request})
        if not serializer.is_valid():
            return Response({
                'success': False,
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        
        serializer.save()
        return Response({
            'success': True,
            'message': 'Machine status updated successfully.',
            'machine': serializer.data
        }, status=status.HTTP_200_OK)
    
    elif request.method == 'DELETE':
        machine.delete()
        return Response({
            'success': True,
            'message': 'Machine deleted successfully.'
        }, status=status.HTTP_200_OK)


@api_view(['GET'])
def admin_machines_list(request):
    """Admin endpoint to see all machines including pending ones"""
    machines = Machine.objects.all().order_by('-created_at')
    serializer = MachineSerializer(machines, many=True, context={'request': request})
    return Response({
        'success': True,
        'machines': serializer.data
    }, status=status.HTTP_200_OK)


@api_view(['PATCH'])
def approve_machine(request, machine_id):
    """Admin endpoint to approve or reject a machine"""
    try:
        machine = Machine.objects.get(machine_id=machine_id)
    except Machine.DoesNotExist:
        return Response({
            'success': False,
            'message': 'Machine not found.'
        }, status=status.HTTP_404_NOT_FOUND)
    
    approval_status = request.data.get('approval_status')
    if approval_status not in ['approved', 'rejected', 'pending']:
        return Response({
            'success': False,
            'message': 'Invalid approval status. Must be approved, rejected, or pending.'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    machine.approval_status = approval_status
    # If approved, also set is_active to True
    if approval_status == 'approved':
        machine.is_active = True
    # If rejected, set is_active to False
    elif approval_status == 'rejected':
        machine.is_active = False
    
    machine.save()
    
    serializer = MachineSerializer(machine, context={'request': request})
    return Response({
        'success': True,
        'message': f'Machine {approval_status} successfully.',
        'machine': serializer.data
    }, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
def contact_list(request):
    if request.method == 'GET':
        contacts = Contact.objects.all().order_by('-created_at')
        serializer = ContactSerializer(contacts, many=True)
        return Response({
            'success': True,
            'contacts': serializer.data
        }, status=status.HTTP_200_OK)
    
    elif request.method == 'POST':
        serializer = ContactSerializer(data=request.data)
        if not serializer.is_valid():
            return Response({
                'success': False,
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        
        contact = serializer.save()
        return Response({
            'success': True,
            'message': 'Inquiry sent successfully.',
            'contact': serializer.data
        }, status=status.HTTP_201_CREATED)


@api_view(['DELETE'])
def contact_detail(request, contact_id):
    try:
        contact = Contact.objects.get(contact_id=contact_id)
    except Contact.DoesNotExist:
        return Response({
            'success': False,
            'message': 'Contact inquiry not found.'
        }, status=status.HTTP_404_NOT_FOUND)
    
    contact.delete()
    return Response({
        'success': True,
        'message': 'Contact inquiry deleted successfully.'
    }, status=status.HTTP_200_OK)