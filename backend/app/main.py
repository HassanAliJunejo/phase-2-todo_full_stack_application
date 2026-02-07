import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.auth import router as auth_router
from .api.todos import router as todos_router
from .core.database import create_db_and_tables
from .core.config import settings

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Create FastAPI app instance
app = FastAPI(
    title="Secure Todo Application Backend",
    description="Backend API for the Secure Todo Application with authentication",
    version="1.0.0"
)

# Add CORS middleware to allow communication with frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    """Initialize database tables on startup"""
    await create_db_and_tables()
    logger.info("Database tables created successfully")

# Include API routers
app.include_router(auth_router, prefix="/api/v1/auth", tags=["authentication"])
app.include_router(todos_router, prefix="/api/v1/todos", tags=["todos"])

@app.get("/")
def read_root():
    """Root endpoint to verify the API is running"""
    logger.info("Root endpoint accessed")
    return {"message": "Secure Todo Application Backend is running!"}

@app.get("/health")
def health_check():
    """Health check endpoint"""
    logger.info("Health check endpoint accessed")
    return {"status": "healthy"}

# Add settings to the app instance so it can be accessed in other modules
app.settings = settings