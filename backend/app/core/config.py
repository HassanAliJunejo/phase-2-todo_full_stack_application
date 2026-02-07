from pydantic_settings import BaseSettings
from typing import Optional
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Settings(BaseSettings):
    # Database settings
    DATABASE_URL: str = os.getenv("DATABASE_URL", "")

    # Auth settings
    SECRET_KEY: str = os.getenv("BETTER_AUTH_SECRET", "")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    # Frontend URL for CORS
    FRONTEND_URL: str = os.getenv("BETTER_AUTH_URL", "http://localhost:3000")

    # Password hashing
    PASSWORD_HASH_ROUNDS: int = 12

    class Config:
        env_file = ".env"
        extra = "ignore"  # Ignore extra fields instead of forbidding them

# Create settings instance
settings = Settings()