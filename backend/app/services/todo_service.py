from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List, Optional
from uuid import UUID
from ..models.todo import Todo, TodoCreate, TodoUpdate


class TodoService:
    @staticmethod
    async def create_todo(todo_data: TodoCreate, user_id: UUID, db_session: AsyncSession) -> Optional[Todo]:
        db_todo = Todo(
            title=todo_data.title,
            description=todo_data.description,
            completed=todo_data.completed,
            user_id=user_id
        )
        
        db_session.add(db_todo)
        await db_session.commit()
        await db_session.refresh(db_todo)
        return db_todo
    
    @staticmethod
    async def get_todos_by_user(user_id: UUID, db_session: AsyncSession) -> List[Todo]:
        result = await db_session.execute(select(Todo).where(Todo.user_id == user_id))
        return result.scalars().all()
    
    @staticmethod
    async def get_todo_by_id(todo_id: UUID, user_id: UUID, db_session: AsyncSession) -> Optional[Todo]:
        result = await db_session.execute(
            select(Todo).where(Todo.id == todo_id, Todo.user_id == user_id)
        )
        return result.scalars().first()
    
    @staticmethod
    async def update_todo(todo_id: UUID, user_id: UUID, todo_update: TodoUpdate, db_session: AsyncSession) -> Optional[Todo]:
        result = await db_session.execute(
            select(Todo).where(Todo.id == todo_id, Todo.user_id == user_id)
        )
        todo = result.scalars().first()
        
        if not todo:
            return None
        
        update_data = todo_update.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(todo, field, value)
        
        db_session.add(todo)
        await db_session.commit()
        await db_session.refresh(todo)
        return todo
    
    @staticmethod
    async def delete_todo(todo_id: UUID, user_id: UUID, db_session: AsyncSession) -> bool:
        result = await db_session.execute(
            select(Todo).where(Todo.id == todo_id, Todo.user_id == user_id)
        )
        todo = result.scalars().first()
        
        if not todo:
            return False
        
        db_session.delete(todo)
        await db_session.commit()
        return True