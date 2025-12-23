from fastapi import APIRouter, HTTPException
from app.models.quiz import QuizRequest, QuizResponse
from app.services.path_generator import PathGeneratorService

router = APIRouter(prefix="/quiz", tags=["Quiz"])
path_service = PathGeneratorService()

@router.post("/generate", response_model=QuizResponse)
async def generate_quiz(quiz_request: QuizRequest):
    """Generate a quiz for a specific week"""
    try:
        quiz = await path_service.generate_quiz(quiz_request)
        return quiz
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))