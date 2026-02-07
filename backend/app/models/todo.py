from __future__ import annotations
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, TYPE_CHECKING
from datetime import datetime, timezone
import uuid

if TYPE_CHECKING:
    from .user import User


class TodoBase(SQLModel):
    title: str
    description: Optional[str] = None
    completed: bool = False


class Todo(TodoBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    user_id: uuid.UUID = Field(foreign_key="user.id", index=True)  # Added index
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc), index=True)  # Added index
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    owner: "User" = Relationship(back_populates="todos")


class TodoCreate(TodoBase):
    pass


class TodoUpdate(SQLModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None


class TodoPublic(TodoBase):
    id: uuid.UUID
    user_id: uuid.UUID
    created_at: datetime
    updated_at: datetime
