import asyncio
import logging
from app.main import app
import uvicorn

# Set up logging to see what's happening
logging.basicConfig(level=logging.DEBUG)

if __name__ == "__main__":
    print("Starting server...")
    try:
        uvicorn.run(
            app,
            host="0.0.0.0",
            port=8000,
            reload=False,  # Disable reload for debugging
            log_level="debug"
        )
    except Exception as e:
        print(f"Error starting server: {e}")
        import traceback
        traceback.print_exc()