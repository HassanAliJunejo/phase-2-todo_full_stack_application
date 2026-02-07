import sys
import os
# Add the backend directory to the path so we can import modules
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..'))

import pytest
from fastapi.testclient import TestClient
from backend.main import app
from backend.db import engine
from sqlmodel import Session, SQLModel
from backend.models import User, Task


@pytest.fixture(name="session")
def session_fixture():
    SQLModel.metadata.create_all(engine)
    with Session(engine) as session:
        yield session
        # Clean up after each test
        session.rollback()


@pytest.fixture(name="client")
def client_fixture(session):
    client = TestClient(app)
    yield client


def test_create_user_and_task(client: TestClient, session: Session):
    """Test creating a user and a task"""
    # Create a user first
    user_data = {
        "email": "test@example.com",
        "name": "Test User"
    }

    # Since we don't have a user creation endpoint, we'll create the user directly in the DB
    user = User(email=user_data["email"], name=user_data["name"])
    session.add(user)
    session.commit()
    session.refresh(user)

    # Create a task for this user
    task_data = {
        "title": "Test Task",
        "description": "Test Description",
        "completed": False
    }

    response = client.post(f"/api/{user.id}/tasks", json=task_data)
    assert response.status_code == 201

    data = response.json()
    assert data["title"] == task_data["title"]
    assert data["description"] == task_data["description"]
    assert data["completed"] == task_data["completed"]
    assert data["user_id"] == user.id


def test_get_tasks_for_user(client: TestClient, session: Session):
    """Test retrieving tasks for a user"""
    # Create a user
    user = User(email="get_test@example.com", name="Get Test User")
    session.add(user)
    session.commit()
    session.refresh(user)

    # Create a task for this user
    task = Task(title="Get Test Task", description="Get Test Desc", completed=False, user_id=user.id)
    session.add(task)
    session.commit()
    session.refresh(task)

    # Get tasks for this user
    response = client.get(f"/api/{user.id}/tasks")
    assert response.status_code == 200

    data = response.json()
    assert len(data) == 1
    assert data[0]["id"] == task.id
    assert data[0]["title"] == task.title


def test_get_specific_task(client: TestClient, session: Session):
    """Test retrieving a specific task"""
    # Create a user
    user = User(email="specific_test@example.com", name="Specific Test User")
    session.add(user)
    session.commit()
    session.refresh(user)

    # Create a task for this user
    task = Task(title="Specific Test Task", description="Specific Test Desc", completed=False, user_id=user.id)
    session.add(task)
    session.commit()
    session.refresh(task)

    # Get the specific task
    response = client.get(f"/api/{user.id}/tasks/{task.id}")
    assert response.status_code == 200

    data = response.json()
    assert data["id"] == task.id
    assert data["title"] == task.title
    assert data["user_id"] == user.id


def test_update_task(client: TestClient, session: Session):
    """Test updating a task"""
    # Create a user
    user = User(email="update_test@example.com", name="Update Test User")
    session.add(user)
    session.commit()
    session.refresh(user)

    # Create a task for this user
    task = Task(title="Original Title", description="Original Desc", completed=False, user_id=user.id)
    session.add(task)
    session.commit()
    session.refresh(task)

    # Update the task
    update_data = {
        "title": "Updated Title",
        "description": "Updated Description",
        "completed": True
    }

    response = client.put(f"/api/{user.id}/tasks/{task.id}", json=update_data)
    assert response.status_code == 200

    data = response.json()
    assert data["title"] == update_data["title"]
    assert data["description"] == update_data["description"]
    assert data["completed"] == update_data["completed"]


def test_delete_task(client: TestClient, session: Session):
    """Test deleting a task"""
    # Create a user
    user = User(email="delete_test@example.com", name="Delete Test User")
    session.add(user)
    session.commit()
    session.refresh(user)

    # Create a task for this user
    task = Task(title="Delete Test Task", description="Delete Test Desc", completed=False, user_id=user.id)
    session.add(task)
    session.commit()
    session.refresh(task)

    # Delete the task
    response = client.delete(f"/api/{user.id}/tasks/{task.id}")
    assert response.status_code == 204

    # Verify the task is gone
    response = client.get(f"/api/{user.id}/tasks/{task.id}")
    assert response.status_code == 404


def test_error_handling_invalid_user(client: TestClient):
    """Test error handling for invalid user ID"""
    task_data = {
        "title": "Test Task",
        "description": "Test Description",
        "completed": False
    }

    # Try to create a task for a non-existent user
    response = client.post("/api/999/tasks", json=task_data)
    assert response.status_code == 404
    assert "detail" in response.json()


def test_error_handling_invalid_task(client: TestClient, session: Session):
    """Test error handling for invalid task ID"""
    # Create a user
    user = User(email="error_test@example.com", name="Error Test User")
    session.add(user)
    session.commit()
    session.refresh(user)

    # Try to get a non-existent task for this user
    response = client.get(f"/api/{user.id}/tasks/999")
    assert response.status_code == 404
    assert "detail" in response.json()