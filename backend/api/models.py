from django.db import models

class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    mobile_number = models.CharField(max_length=15, unique=True)
    password = models.CharField(max_length=255)  # hashed
    role = models.CharField(max_length=20, default='user')  # 'user' or 'admin'
    status = models.IntegerField(default=1)  # 1 = active, 0 = inactive
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'users'  # exact table name in DB

class Machine(models.Model):
    machine_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    brand = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    features = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    price_type = models.CharField(max_length=20, default='Fixed')  # Fixed or Negotiable
    condition = models.CharField(max_length=20, default='New')  # New or Used
    needle_count = models.IntegerField(blank=True, null=True)
    head_type = models.CharField(max_length=50, default='Single Head')  # Single Head or Multi Head
    video_link = models.URLField(blank=True, null=True)
    image = models.ImageField(upload_to='machine_images/', blank=True, null=True)
    is_active = models.BooleanField(default=True)  # Whether machine is visible on website
    approval_status = models.CharField(max_length=20, default='pending')  # pending, approved, rejected
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'machines'


class Contact(models.Model):
    contact_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    email = models.EmailField()
    machine_name = models.CharField(max_length=255, blank=True, null=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'contact_inquiries'