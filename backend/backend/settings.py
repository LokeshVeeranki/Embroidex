from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-%$*-6w!rqmby8o7%i8e%tjx7b)rdj@e@csdfgmv88m*l8de8fn'

DEBUG = True

ALLOWED_HOSTS = []

INSTALLED_APPS = [
    'django.contrib.contenttypes',  # DRF needs this internally
    'django.contrib.auth',          # DRF needs this internally

    # Third party
    'corsheaders',
    'rest_framework',

    # Our app
    'api',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'

# ─── MySQL with root user ─────────────────────────────────────────────────────
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'smartstitch_enterprises',   # change this
        'USER': 'root',
        'PASSWORD': 'Root@123',                 # your root password (blank if none)
        'HOST': 'localhost',
        'PORT': '3306',
    }
}

# ─── JWT Settings ─────────────────────────────────────────────────────────────
JWT_SECRET = 'your_super_secret_jwt_key'   # change this, keep it private
JWT_ALGORITHM = 'HS256'
JWT_EXPIRY_HOURS = 24

# ─── DRF — no default auth since we use JWT manually ─────────────────────────
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [],
    'DEFAULT_PERMISSION_CLASSES': [],
}

# ─── CORS ─────────────────────────────────────────────────────────────────────
CORS_ALLOW_ALL_ORIGINS = True   # lock this down in production
CORS_ALLOW_HEADERS = [
    'content-type',
    'x-user-id',
]

# ─── Password Validators (kept as-is) ────────────────────────────────────────
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

STATIC_URL = 'static/'
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'