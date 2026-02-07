from __future__ import annotations
from sqlmodel import SQLModel, Field, Relationship
from typing import List, Optional, TYPE_CHECKING
from datetime import datetime, timezone
import uuid

if TYPE_CHECKING:
    from .todo import Todo


class UserBase(SQLModel):
    email: str = Field(sa_column_kwargs={"unique": True})  # Ensure unique constraint
    name: str


class User(UserBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    hashed_password: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc), index=True)  # Added index
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    todos: List["Todo"] = Relationship(back_populates="owner")


class UserCreate(UserBase):
    password: str


class UserUpdate(SQLModel):
    name: Optional[str] = None
    email: Optional[str] = None


class UserPublic(UserBase):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime
