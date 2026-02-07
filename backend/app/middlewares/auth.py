from fastapi import HTTPException, status, Request, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Callable, Optional
from functools import wraps
import uuid
from jose import jwt, JWTError
from ..core.config import settings
from ..models.user import User
from ..core.database import AsyncSessionLocal
from sqlalchemy import select
import time
import logging

logger = logging.getLogger(__name__)

# Simple in-memory cache for validated tokens (for demonstration)
# In production, consider Redis or another distributed cache
token_cache = {}

async def get_db_session():
    """Get a database session"""
    async with AsyncSessionLocal() as session:
        yield session

async def get_current_user(
    request: Request,
    db: AsyncSession = Depends(get_db_session)
) -> User:
    """
    Get current user based on the provided token with caching
    """
    token_header = request.headers.get("Authorization")
    if not token_header or not token_header.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = token_header.split(" ")[1]
    
    # Check if token is in cache
    cached_user = token_cache.get(token)
    if cached_user:
        # Validate cache hasn't expired (simple timeout check)
        if time.time() - cached_user['timestamp'] < 300:  # 5 minutes cache
            return cached_user['user']
        else:
            # Remove expired cache entry
            del token_cache[token]

    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Use a more efficient query with scalar_one_or_none
    stmt = select(User).where(User.id == uuid.UUID(user_id))
    result = await db.execute(stmt)
    user = result.scalar_one_or_none()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Cache the user for subsequent requests
    token_cache[token] = {
        'user': user,
        'timestamp': time.time()
    }

    return user

def require_auth():
    """Decorator to require authentication for endpoints"""
    def auth_dependency(current_user: User = Depends(get_current_user)):
        return current_user
    return Depends(auth_dependency)