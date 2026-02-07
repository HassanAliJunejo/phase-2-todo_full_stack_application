#!/usr/bin/env python
"""
Startup script for the Secure Todo Application Backend - Alternative Port
"""

import uvicorn
from app.main import app

if __name__ == "__main__":
    print("Starting server on port 8080...")
    uvicorn.run(
        "app.main:app",
        host="127.0.0.1",
        port=8080,  # Using alternative port
        reload=False,  # Disable in production
        log_level="info"
    )