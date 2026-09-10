# Huntified - African Property Rental Platform

A Django-based rental platform connecting tenants with verified landlords across Africa, eliminating fraud and providing transparent pricing.

## Features

- JWT Authentication with token blacklisting
- Property search and filtering by country, location, price
- Property listing creation and management for landlords
- Verified property badges to prevent fraud
- Responsive landing page with modern UI (Tailwind CSS)
- Multi-country support (Nigeria, Ghana, Kenya, and more)
- Image upload support for property photos
- Django admin panel for full platform management

## Tech Stack

- Backend: Django 6.1, Django REST Framework
- Authentication: SimpleJWT
- Database: SQLite (development) / PostgreSQL (production)
- Frontend: HTML5, Tailwind CSS, JavaScript
- Deployment: WhiteNoise for static files, python-decouple for environment variables

## Prerequisites

- Python 3.10+
- pip (package manager)
- virtualenv (recommended)

## Quick Setup Guide

### 1. Clone the repository

    git clone https://github.com/yourusername/huntified.git
    cd huntified

### 2. Create and activate virtual environment

Create virtual environment:

    python -m venv .venv

Activate on Windows:

    .venv\Scripts\Activate.ps1

If you get PowerShell execution error, run this first:

    Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

### 3. Install dependencies

Upgrade pip:

    python -m pip install --upgrade pip

Install all requirements:

    pip install -r requirements.txt

### 4. Set up environment variables

The project includes a .env file with your secret key. For production, update these values:

    SECRET_KEY='your-production-secret-key-here'
    DEBUG=False
    ALLOWED_HOSTS=yourdomain.com,localhost

### 5. Create database tables

Create migrations:

    python manage.py makemigrations

Apply migrations:

    python manage.py migrate

### 6. Create admin superuser

    python manage.py createsuperuser

### 7. Create required directories

Create media folder for property images:

    mkdir media

Create staticfiles for production:

    mkdir staticfiles

### 8. Run the development server

    python manage.py runserver

Visit your application:

- Landing Page: http://127.0.0.1:8000/
- Admin Panel: http://127.0.0.1:8000/admin/
- API Endpoints: http://127.0.0.1:8000/api/

## API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/signup/ | Register new user |
| POST | /api/logout/ | Logout (blacklists token) |
| POST | /api/token/ | Get JWT access/refresh tokens |
| POST | /api/token/refresh/ | Refresh access token |

### Property Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/search_filter/ | Search and filter properties |
| GET/POST | /api/list_property_create/ | List user's properties or create new |
| GET/PUT/DELETE | /api/property_details/<id>/ | Get, update, or delete property |

## Project Structure

    huntified/
    ├── huntified/                  # Main Django app
    │   ├── migrations/             # Database migrations
    │   ├── __init__.py
    │   ├── admin.py                # Admin panel configuration
    │   ├── apps.py
    │   ├── models.py               # Core database models
    │   ├── serializers.py          # API serializers
    │   ├── tests.py                # Unit tests
    │   ├── urls.py                 # App-specific URLs
    │   └── views.py                # API and view logic
    ├── main/                       # Project settings
    │   ├── __init__.py
    │   ├── asgi.py
    │   ├── settings.py             # Main settings file
    │   ├── urls.py                 # Root URL configuration
    │   └── wsgi.py
    ├── huntified/templates/
    │   └── index.html              # Landing page
    ├── media/                      # User-uploaded property images
    ├── staticfiles/                # Collected static files
    ├── .env                        # Environment variables
    ├── .gitignore
    ├── manage.py
    └── requirements.txt
