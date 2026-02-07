from fastapi import Request, Response
from fastapi.routing import APIRoute
import time
import logging
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response as StarletteResponse

logger = logging.getLogger(__name__)

class PerformanceMonitoringMiddleware(BaseHTTPMiddleware):
    """
    Middleware to monitor API performance and log slow requests
    """
    async def dispatch(self, request: Request, call_next):
        start_time = time.time()
        
        # Log the incoming request
        logger.debug(f"Incoming request: {request.method} {request.url.path}")
        
        response = await call_next(request)
        
        # Calculate processing time
        process_time = time.time() - start_time
        
        # Log slow requests (over 500ms)
        if process_time > 0.5:
            logger.warning(
                f"SLOW REQUEST: {request.method} {request.url.path} "
                f"took {process_time:.2f}s - Status: {response.status_code}"
            )
        else:
            logger.info(
                f"Request: {request.method} {request.url.path} "
                f"took {process_time:.2f}s - Status: {response.status_code}"
            )
        
        # Add timing header to response
        response.headers["X-Process-Time"] = str(process_time)
        
        return response

class LoggingRoute(APIRoute):
    """
    Custom route class that logs request details
    """
    def get_route_handler(self):
        original_handler = super().get_route_handler()

        async def custom_handler(request: Request) -> StarletteResponse:
            start_time = time.time()
            
            try:
                response = await original_handler(request)
            except Exception as e:
                process_time = time.time() - start_time
                logger.error(
                    f"ERROR in {request.method} {request.url.path}: {str(e)} "
                    f"(took {process_time:.2f}s)"
                )
                raise
            
            process_time = time.time() - start_time
            logger.info(
                f"{request.method} {request.url.path} completed in {process_time:.2f}s "
                f"with status {response.status_code}"
            )
            
            return response

        return custom_handler