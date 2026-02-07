# Quickstart Guide: Backend Modular Restructure with Auth Integration

## Overview
This guide provides instructions to quickly set up and run the Backend Modular Structure with Auth Integration for the Todo application.

## Prerequisites
- Python 3.10 or higher
- pip package manager
- Access to Neon PostgreSQL database
- Better Auth secret key for JWT verification

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Navigate to Backend Directory
```bash
cd backend
```

### 3. Create Virtual Environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 4. Install Dependencies
```bash
pip install fastapi sqlmodel psycopg2-binary python-dotenv uvicorn alembic python-jose[cryptography] passlib[bcrypt]
```

### 5. Configure Environment Variables
Update the `.env` file in the backend directory with your database URL and auth secret:
```env
DATABASE_URL=postgresql+psycopg2://username:password@ep-xxxx.us-east-1.aws.neon.tech/dbname?sslmode=require
BETTER_AUTH_SECRET=your_better_auth_secret_here
```

### 6. Initialize Alembic Migrations
```bash
alembic init alembic
```

### 7. Run the Application
```bash
uvicorn src.main:app --reload
```

The API will be available at `http://localhost:8000` with documentation at `http://localhost:8000/docs`

## API Endpoints

Once running, the following endpoints will be available:
- `GET /api/{user_id}/tasks` - List all tasks for a user
- `POST /api/{user_id}/tasks` - Create a new task for a user
- `GET /api/{user_id}/tasks/{id}` - Get a specific task
- `PUT /api/{user_id}/tasks/{id}` - Update a specific task
- `DELETE /api/{user_id}/tasks/{id}` - Delete a specific task

## Authentication

All endpoints require a valid JWT token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

## Testing the API
Use the integrated Swagger UI at `/docs` to test the endpoints, or use curl/Postman with the appropriate user_id and task data, ensuring you include a valid JWT token in the Authorization header.

## Troubleshooting
- If you get database connection errors, verify your DATABASE_URL is correct
- If endpoints return 401, ensure your JWT token is valid and properly formatted
- If endpoints return 403, verify that the user_id in the URL matches the user_id in your JWT token
- Check that your virtual environment is activated when running the application