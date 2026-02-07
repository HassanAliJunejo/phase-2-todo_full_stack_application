# Data Model: Login Page UI Matching WhatsApp Image Reference

## Entities

### LoginForm
- **Fields**:
  - email: string (user's email address)
  - password: string (user's password)
  - rememberMe: boolean (whether to remember the user session)
- **Validation Rules**:
  - Email must be valid email format
  - Password must meet minimum length requirements
  - Email and password fields are required
- **Relationships**: Connects to authentication service for validation

### SocialAuthProvider
- **Fields**:
  - providerName: string (e.g., "Google", "Facebook")
  - providerIcon: string (icon identifier)
  - isActive: boolean (whether provider is enabled)
- **Validation Rules**:
  - Provider name must be one of supported providers
  - Icon must exist in asset library
- **Relationships**: Connects to external authentication services

### UIConfiguration
- **Fields**:
  - backgroundColor: string (mesh gradient definition)
  - glassEffect: object (glassmorphism properties)
  - borderRadius: string (card corner radius)
  - fontFamily: string (font family for typography)
- **Validation Rules**:
  - Colors must be valid CSS values
  - Border radius must be valid CSS value
  - Font family must be available
- **Relationships**: Applied to login page component

## State Transitions

### LoginForm State
- **Initial State**: Empty fields, submit button enabled
- **On Field Change**: Update field value, validate input
- **On Submit**: Show loading state, disable submit button
- **On Success**: Redirect to dashboard
- **On Error**: Display error message, re-enable submit button

### SocialAuth State
- **Initial State**: Available providers displayed
- **On Click Provider**: Initiate OAuth flow
- **On Success**: Redirect to dashboard
- **On Cancel**: Return to login form