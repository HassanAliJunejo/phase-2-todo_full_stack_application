from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import Optional
from ..models.user import User
from ..schemas.auth import UserRegister
from ..utils.password_utils import hash_password, verify_password
from ..core.security import create_access_token
from datetime import timedelta
from uuid import UUID


class AuthService:
    @staticmethod
    async def register_user(user_data: UserRegister, db_session: AsyncSession) -> Optional[User]:
        """
        Register a new user
        """
        # Check if user already exists
        result = await db_session.execute(select(User).where(User.email == user_data.email))
        existing_user = result.scalars().first()
        if existing_user:
            return None

        # Hash the password
        hashed_password = hash_password(user_data.password)

        # Create new user
        db_user = User(
            email=user_data.email,
            name=user_data.name,
            hashed_password=hashed_password
        )

        db_session.add(db_user)
        await db_session.commit()
        await db_session.refresh(db_user)

        return db_user

    @staticmethod
    async def authenticate_user(email: str, password: str, db_session: AsyncSession) -> Optional[User]:
        """
        Authenticate a user by email and password
        """
        result = await db_session.execute(select(User).where(User.email == email))
        user = result.scalars().first()
        if not user or not verify_password(password, user.hashed_password):
            return None
        return user

    @staticmethod
    async def create_token_for_user(user: User) -> str:
        """
        Create an access token for the authenticated user
        """
        data = {"sub": str(user.id)}
        token = create_access_token(data=data, expires_delta=timedelta(minutes=30))
        return token