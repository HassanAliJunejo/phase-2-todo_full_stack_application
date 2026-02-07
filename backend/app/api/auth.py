from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Any
from ..schemas.auth import UserRegister, UserLogin, Token, UserResponse
from ..services.auth_service import AuthService
from ..core.database import AsyncSessionLocal
from sqlalchemy.exc import IntegrityError
from ..middlewares.auth import get_current_user

router = APIRouter()


async def get_db_session():
    """
    Get a database session
    """
    async with AsyncSessionLocal() as session:
        yield session


@router.post("/register", response_model=UserResponse)
async def register(user_data: UserRegister, db: AsyncSession = Depends(get_db_session)) -> Any:
    """
    Register a new user
    """
    try:
        user = await AuthService.register_user(user_data, db)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="A user with this email already exists"
            )
        return user
    except IntegrityError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A user with this email already exists"
        )


@router.post("/login", response_model=Token)
async def login(user_data: UserLogin, db: AsyncSession = Depends(get_db_session)) -> Any:
    """
    Authenticate user and return access token
    """
    user = await AuthService.authenticate_user(user_data.email, user_data.password, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = await AuthService.create_token_for_user(user)
    return {"access_token": token, "token_type": "bearer"}


@router.post("/logout")
async def logout():
    """
    Logout user (client-side token removal)
    """
    # Since JWT tokens are stateless, we can't invalidate them server-side
    # The client should remove the token from local storage/cookies
    return {"message": "Logged out successfully"}


@router.get("/me", response_model=UserResponse)
async def get_current_user_info(
    current_user: UserResponse = Depends(get_current_user)
) -> Any:
    """
    Get current user info
    """
    return current_user