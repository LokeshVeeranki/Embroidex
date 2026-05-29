from rest_framework import serializers
from .models import User, Machine, Contact

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['user_id', 'first_name', 'last_name', 'email', 'mobile_number', 'role', 'created_at']
        read_only_fields = ['user_id', 'created_at']

class SignupSerializer(serializers.Serializer):
    first_name = serializers.CharField(max_length=100)
    last_name = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    mobile_number = serializers.CharField(max_length=15)
    password = serializers.CharField(write_only=True, min_length=6)
    role = serializers.CharField(default='user', required=False)

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

class MachineSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False, allow_null=True)
    
    class Meta:
        model = Machine
        fields = [
            'machine_id', 'name', 'brand', 'description', 'features',
            'price', 'price_type', 'condition', 'needle_count',
            'head_type', 'video_link', 'image', 'is_active', 'approval_status',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['machine_id', 'created_at', 'updated_at']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.image:
            request = self.context.get('request')
            if request:
                try:
                    representation['image'] = request.build_absolute_uri(instance.image.url)
                except:
                    representation['image'] = None
        return representation

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['contact_id', 'first_name', 'last_name', 'phone', 'email', 'machine_name', 'message', 'created_at']
        read_only_fields = ['contact_id', 'created_at']