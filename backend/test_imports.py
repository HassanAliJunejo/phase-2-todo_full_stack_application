#!/usr/bin/env python
"""
Simple test script to check if backend modules can be imported
"""

try:
    print("Testing imports...")
    
    from app.main import app
    print("✓ Successfully imported app.main")
    
    from app.api.auth import router as auth_router
    print("✓ Successfully imported auth router")
    
    from app.api.todos import router as todos_router
    print("✓ Successfully imported todos router")
    
    from app.core.database import AsyncSessionLocal, create_db_and_tables
    print("✓ Successfully imported database components")
    
    from app.schemas.auth import UserRegister, UserLogin, Token, UserResponse
    print("✓ Successfully imported auth schemas")
    
    from app.services.auth_service import AuthService
    print("✓ Successfully imported auth service")
    
    from app.middlewares.auth import get_current_user
    print("✓ Successfully imported auth middleware")
    
    print("\nAll imports successful!")
    
except ImportError as e:
    print(f"✗ Import error: {e}")
    import traceback
    traceback.print_exc()
except Exception as e:
    print(f"✗ Unexpected error: {e}")
    import traceback
    traceback.print_exc()