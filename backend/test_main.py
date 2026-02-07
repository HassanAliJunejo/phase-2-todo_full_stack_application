import pytest
import asyncio
from httpx import AsyncClient
from app.main import app


@pytest.mark.asyncio
async def test_read_root():
    """Test the root endpoint"""
    async with AsyncClient(app=app, base_url="http://testserver") as ac:
        response = await ac.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Secure Todo Application Backend is running!"}


@pytest.mark.asyncio
async def test_health_check():
    """Test the health check endpoint"""
    async with AsyncClient(app=app, base_url="http://testserver") as ac:
        response = await ac.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}


# More comprehensive tests would go here in a real implementation
# These would include testing authentication, todo CRUD operations, etc.