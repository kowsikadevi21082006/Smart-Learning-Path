from fastapi import APIRouter, HTTPException
from app.models.learning_path import UserInput, LearningPathResponse
from app.services.path_generator import PathGeneratorService

router = APIRouter(prefix="/learning-paths", tags=["Learning Paths"])
path_service = PathGeneratorService()

@router.post("/generate", response_model=LearningPathResponse)
async def generate_learning_path(user_input: UserInput):
    """Generate a personalized learning path"""
    result = await path_service.generate_learning_path(user_input)
    
    if not result.success:
        raise HTTPException(status_code=500, detail=result.message)
    
    return result

@router.get("/{path_id}")
async def get_learning_path(path_id: str):
    """Retrieve a saved learning path"""
    path = await path_service.vector_store.get_learning_path(path_id)
    
    if not path:
        raise HTTPException(status_code=404, detail="Learning path not found")
    
    return path