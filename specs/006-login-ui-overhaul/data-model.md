# Data Model: Login Page UI Overhaul

## Overview
This feature is a UI-only change that doesn't introduce new data models. It modifies the presentation layer of existing authentication components while preserving all existing functionality.

## Affected Entities

### Login Form
- **Description**: Represents the user authentication interface with username/email and password fields
- **Fields**: 
  - usernameOrEmail (string) - user identifier for login
  - password (string) - user password for authentication
  - rememberMe (boolean) - optional flag to persist session
- **Relationships**: Connects to existing authentication system
- **Validation**: Maintains existing validation rules from the current implementation

### Social Login Providers
- **Description**: Represents external authentication services (Google, Facebook) integrated with the login form
- **Fields**:
  - providerName (string) - name of the social provider (e.g., "Google", "Facebook")
  - providerIcon (string) - reference to the provider's branding/icon
  - isEnabled (boolean) - whether the provider option is active
- **Relationships**: Connects to existing social authentication flows
- **State**: Active/Inactive based on configuration

## UI Components (New/Modified)

### LoginCard
- **Description**: The main container element with glassmorphism effect
- **Properties**:
  - borderRadius: "rounded-[2.5rem]"
  - background: "bg-white/70"
  - backdropFilter: "backdrop-blur-xl"
  - boxShadow: "shadow-2xl" with blue tint

### InputField
- **Description**: Styled input fields with icons and focus effects
- **Properties**:
  - background: "bg-slate-50/50"
  - border: "border-slate-200"
  - focusBorder: "focus:border-purple-500"
  - icon: positioned on the left side
  - padding: adjusted for icon spacing

### SocialButton
- **Description**: Styled buttons for social login providers
- **Properties**:
  - background: "bg-white"
  - border: "border border-slate-200"
  - borderRadius: "rounded-xl"
  - width: "w-full" (equal width)

### MainActionButton
- **Description**: Primary action button with gradient styling
- **Properties**:
  - width: "w-full"
  - gradient: "from-[#0284c7] to-[#a855f7]"
  - textColor: "text-white"
  - icon: arrow icon
  - hoverEffect: "hover:opacity-90"

## Constraints
- All existing form logic and input names must remain unchanged
- Authentication flow must remain identical to current implementation
- All existing validation and error handling must be preserved