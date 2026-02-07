# API Contract: Login UI Overhaul

## Authentication Endpoints

### POST /api/auth/login
Authenticate user with email and password

**Request Body**:
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Response**:
- 200: Successful authentication
```json
{
  "user": {
    "id": "number",
    "email": "string",
    "name": "string"
  },
  "access_token": "string (JWT token)"
}
```
- 401: Invalid credentials
```json
{
  "error": "string"
}
```

### POST /api/auth/signup
Register new user

**Request Body**:
```json
{
  "email": "string (required)",
  "password": "string (required)",
  "name": "string (required)"
}
```

**Response**:
- 201: User created successfully
```json
{
  "user": {
    "id": "number",
    "email": "string",
    "name": "string"
  },
  "access_token": "string (JWT token)"
}
```
- 400: Validation error
```json
{
  "error": "string"
}
```

### GET /api/auth/me
Get current user information

**Headers**:
- Authorization: Bearer {token} (required)

**Response**:
- 200: User information retrieved
```json
{
  "id": "number",
  "email": "string",
  "name": "string"
}
```
- 401: Unauthorized
```json
{
  "error": "string"
}
```

## UI Components Contract

### LoginForm Props
```typescript
interface LoginFormProps {
  onLoginSuccess: () => void;
  onError: (error: string) => void;
}
```

### InputField Props
```typescript
interface InputFieldProps {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: React.ReactNode;
  required?: boolean;
}
```

### SocialButton Props
```typescript
interface SocialButtonProps {
  provider: 'google' | 'facebook';
  onClick: () => void;
  disabled?: boolean;
}
```