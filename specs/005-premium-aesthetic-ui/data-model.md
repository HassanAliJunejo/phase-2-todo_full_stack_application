# Data Model: Premium Aesthetic UI

## Task Entity

**Definition**: Represents a user's task with enhanced visual metadata

**Fields**:
- `id` (string/number): Unique identifier for the task
- `title` (string): Task title (required, max 255 chars)
- `description` (string): Optional task description (max 1000 chars)
- `priority` (string): Priority level ('high' | 'medium' | 'low') - affects badge color
- `completed` (boolean): Completion status
- `createdAt` (string/Date): ISO timestamp of creation date
- `updatedAt` (string/Date): ISO timestamp of last update
- `userId` (string/number): Foreign key linking to user who owns the task

**Relationships**:
- Belongs to one User (many tasks to one user)
- Priority affects visual representation (red for high, amber for medium, emerald for low)

**Validation rules**:
- Title must be 1-255 characters
- Priority must be one of 'high', 'medium', 'low'
- createdAt must be a valid ISO date string
- userId must reference an existing user

## User Entity

**Definition**: Represents a registered user with authentication details

**Fields**:
- `id` (string/number): Unique identifier for the user
- `email` (string): User's email address (unique, valid email format)
- `name` (string): User's display name (optional)
- `jwtToken` (string): Current JWT authentication token
- `tokenExpiry` (string/Date): Expiration timestamp for the JWT token

**Relationships**:
- Has many Tasks (one user to many tasks)

**Validation rules**:
- Email must be unique and valid format
- JWT token must be present for authenticated operations
- tokenExpiry must be a future date

## Toast Notification Entity

**Definition**: Represents temporary UI notifications for user feedback

**Fields**:
- `id` (string): Unique identifier for the notification
- `type` (string): Notification type ('success' | 'error' | 'info' | 'warning')
- `message` (string): Notification message content
- `duration` (number): Auto-dismiss duration in milliseconds (default: 4000)
- `createdAt` (string/Date): ISO timestamp of when notification was created

**Validation rules**:
- Message must be 1-255 characters
- Type must be one of the allowed values
- Duration must be between 1000-10000 ms

## Session State Entity

**Definition**: Represents the current authentication state of the user

**Fields**:
- `isLoggedIn` (boolean): Whether the user is currently authenticated
- `user` (User object): The authenticated user object (null if not logged in)
- `isLoading` (boolean): Whether authentication status is being determined
- `error` (string): Any error message related to authentication
- `tokenExpiry` (string/Date): Timestamp when the current token expires

**Validation rules**:
- If isLoggedIn is true, user object must be present
- tokenExpiry must be a valid future date when present