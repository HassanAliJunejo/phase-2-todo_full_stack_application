# Data Model: Todo App UI/UX Design

## Overview
This document outlines the UI/UX data structures and components for the Todo App Hackathon project. Since this is primarily a UI/UX design feature, the "data model" focuses on the visual components and their properties rather than traditional data schemas.

## UI Components

### 1. Task Card Component
- **Component Name**: TaskCard
- **Fields/Props**:
  - id: string (unique identifier)
  - title: string (task title)
  - description: string (optional task description)
  - priority: enum (Low, Medium, High)
  - completed: boolean (completion status)
  - createdAt: Date (creation timestamp)
  - updatedAt: Date (last update timestamp)
  - dueDate: Date (optional due date)
- **Relationships**: Belongs to a User
- **Validation rules**: Title is required, priority must be one of the three values
- **State transitions**: completed (false → true), priority (Low → Medium → High)

### 2. Priority Badge Component
- **Component Name**: PriorityBadge
- **Fields/Props**:
  - priority: enum (Low, Medium, High)
  - className: string (optional additional CSS classes)
- **Relationships**: Associated with TaskCard
- **Validation rules**: Priority must be one of the three values
- **Visual representation**: Color-coded badge (green for Low, yellow for Medium, red for High)

### 3. Glassmorphism Card Component
- **Component Name**: GlassCard
- **Fields/Props**:
  - children: React.ReactNode (card content)
  - className: string (optional additional CSS classes)
  - padding: string (padding size, default medium)
- **Relationships**: Used by TaskCard and other UI elements
- **Validation rules**: Children content is required
- **Visual properties**: Semi-transparent background with backdrop blur effect

### 4. Button Component
- **Component Name**: UIButton
- **Fields/Props**:
  - variant: enum (primary, secondary, danger, ghost)
  - size: enum (sm, md, lg)
  - disabled: boolean
  - onClick: function
  - children: React.ReactNode
  - className: string (optional additional CSS classes)
- **Relationships**: Used throughout the UI for interactive elements
- **Validation rules**: onClick handler required when not disabled
- **Visual properties**: Hover effects, focus states, disabled styling

### 5. Checkbox Component
- **Component Name**: AnimatedCheckbox
- **Fields/Props**:
  - checked: boolean
  - onChange: function
  - disabled: boolean
  - className: string (optional additional CSS classes)
- **Relationships**: Used within TaskCard for completion status
- **Validation rules**: onChange handler required
- **Visual properties**: Smooth animation on state change

### 6. Empty State Component
- **Component Name**: EmptyState
- **Fields/Props**:
  - title: string
  - description: string
  - icon: LucideIcon
  - actionText: string (optional call-to-action text)
  - onAction: function (optional action handler)
- **Relationships**: Used in dashboard when no tasks exist
- **Validation rules**: Title and description are required
- **Visual properties**: Illustration with call-to-action

## Layout Components

### 7. Sidebar Component
- **Component Name**: Sidebar
- **Fields/Props**:
  - navigationItems: array of objects (label, href, icon)
  - user: object (name, avatar)
  - className: string (optional additional CSS classes)
- **Relationships**: Part of dashboard layout
- **Validation rules**: navigationItems must be an array of valid items
- **State transitions**: Active navigation item changes on selection

### 8. Dashboard Layout Component
- **Component Name**: DashboardLayout
- **Fields/Props**:
  - sidebar: ReactNode (sidebar component)
  - children: ReactNode (main content)
  - className: string (optional additional CSS classes)
- **Relationships**: Contains Sidebar and main content area
- **Validation rules**: Both sidebar and children are required
- **Visual properties**: Split-view or sidebar layout as specified

## Authentication Components

### 9. Auth Card Component
- **Component Name**: AuthCard
- **Fields/Props**:
  - title: string
  - description: string
  - children: React.ReactNode
  - footer: React.ReactNode (optional links like "Forgot password?")
- **Relationships**: Used in login and signup pages
- **Validation rules**: Title and children are required
- **Visual properties**: Centered card-based layout with focus states

### 10. Input Field Component
- **Component Name**: InputField
- **Fields/Props**:
  - label: string
  - type: string (text, email, password, etc.)
  - value: string
  - onChange: function
  - error: string (optional error message)
  - placeholder: string (optional)
  - required: boolean (default false)
- **Relationships**: Used within AuthCard and other forms
- **Validation rules**: If required, value must not be empty
- **Visual properties**: Smooth focus states as specified

## Icon Components

### 11. Lucide Icon Component
- **Component Name**: Icon
- **Fields/Props**:
  - name: string (icon name from Lucide-React)
  - size: number (default 24)
  - color: string (default currentColor)
  - className: string (optional additional CSS classes)
- **Relationships**: Used throughout UI for actions (Edit, Delete, Add, User)
- **Validation rules**: Name must correspond to a valid Lucide icon
- **Visual properties**: Consistent sizing and coloring

## Responsive Properties

### 12. Responsive Container Component
- **Component Name**: ResponsiveContainer
- **Fields/Props**:
  - children: React.ReactNode
  - maxWidth: string (sm, md, lg, xl, 2xl - default lg)
  - className: string (optional additional CSS classes)
- **Relationships**: Wraps main content areas
- **Validation rules**: Children content is required
- **State transitions**: Adjusts layout based on screen size