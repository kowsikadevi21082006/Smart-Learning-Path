from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import get_settings
from app.api.routes import learning_paths, quiz

settings = get_settings()

app = FastAPI(
    title="Smart Learning Path Generator API",
    description="Dynamic learning roadmap generator powered by AI",
    version=settings.api_version
)

# CORS - Now using the property method
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://smart-learning-path-8ted.vercel.app"  # frontend URL
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(learning_paths.router, prefix=f"/{settings.api_version}")
app.include_router(quiz.router, prefix=f"/{settings.api_version}")

@app.get("/")
async def root():
    return {
        "message": "Smart Learning Path Generator API",
        "version": settings.api_version,
        "status": "running"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

