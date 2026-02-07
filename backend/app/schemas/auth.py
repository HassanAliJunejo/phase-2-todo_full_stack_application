from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import datetime


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    user_id: Optional[str] = None


class UserLogin(BaseModel):
    email: str
    password: str


class UserRegister(UserLogin):
    name: str


class UserResponse(BaseModel):
    id: UUID
    email: str
    name: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True