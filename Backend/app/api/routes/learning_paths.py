from fastapi import APIRouter, HTTPException, Query
from app.models.learning_path import UserInput, LearningPathResponse
from app.services.path_generator import PathGeneratorService
from typing import Optional

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

# 👇 NEW ROUTE
@router.get("/")
async def list_learning_paths(limit: int = Query(10, ge=1, le=100)):
    """List all learning paths"""
    try:
        paths = await path_service.vector_store.get_all_learning_paths(limit)
        return {
            "success": True,
            "count": len(paths),
            "learning_paths": paths
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 👇 NEW ROUTE
@router.delete("/{path_id}")
async def delete_learning_path(path_id: str):
    """Delete a learning path"""
    try:
        deleted = await path_service.vector_store.delete_learning_path(path_id)
        if not deleted:
            raise HTTPException(status_code=404, detail="Learning path not found")
        return {"success": True, "message": "Learning path deleted"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))