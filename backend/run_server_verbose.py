#!/usr/bin/env python
"""
Verbose startup script for the Secure Todo Application Backend
"""

import uvicorn
import logging
from app.main import app

# Enable logging
logging.basicConfig(level=logging.DEBUG)

if __name__ == "__main__":
    print("Starting server on port 8080 with verbose logging...")
    try:
        uvicorn.run(
            "app.main:app",
            host="127.0.0.1",
            port=8080,
            reload=False,
            log_level="debug",
            access_log=True
        )
    except Exception as e:
        print(f"Failed to start server: {e}")
        import traceback
        traceback.print_exc()