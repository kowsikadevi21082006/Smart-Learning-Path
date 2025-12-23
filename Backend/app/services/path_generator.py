from app.services.llm_service import LLMService
from app.services.vector_service import VectorService
from app.services.cache_service import CacheService  # 👈 NEW
from app.models.learning_path import UserInput, LearningPath, LearningPathResponse
from app.models.quiz import QuizRequest, QuizResponse
from app.utils.prompts import get_learning_path_prompt, get_quiz_prompt
import hashlib
import json

class PathGeneratorService:
    def __init__(self):
        self.llm = LLMService()
        self.vector_store = VectorService()
        self.cache = CacheService()  # 👈 NEW
    
    def _get_cache_key(self, user_input: UserInput) -> str:
        """Generate cache key from user input"""
        input_str = json.dumps(user_input.dict(), sort_keys=True)
        return f"learning_path:{hashlib.md5(input_str.encode()).hexdigest()}"
    
    async def generate_learning_path(self, user_input: UserInput) -> LearningPathResponse:
        """Generate a complete learning path with caching"""
        try:
            # Check cache first
            cache_key = self._get_cache_key(user_input)
            cached_path = self.cache.get(cache_key)
            
            if cached_path:
                print("✅ Returning cached learning path")
                return LearningPathResponse(
                    success=True,
                    learning_path=LearningPath(**cached_path),
                    message="Learning path retrieved from cache"
                )
            
            # Generate prompt
            prompt = get_learning_path_prompt(user_input.dict())
            
            # Get LLM response
            path_data = await self.llm.generate_completion(prompt)
            
            # Create LearningPath object
            learning_path = LearningPath(
                user_input=user_input,
                **path_data
            )
            
            # Store in MongoDB
            path_id = await self.vector_store.store_learning_path(
                learning_path.dict(exclude={'id'})
            )
            learning_path.id = path_id
            
            # Cache the result
            self.cache.set(cache_key, learning_path.dict(), expire=3600)
            
            return LearningPathResponse(
                success=True,
                learning_path=learning_path,
                message="Learning path generated successfully"
            )
            
        except Exception as e:
            return LearningPathResponse(
                success=False,
                message=f"Error generating learning path: {str(e)}"
            )
    
    async def generate_quiz(self, quiz_request: QuizRequest) -> QuizResponse:
        """Generate a quiz for a specific week"""
        try:
            prompt = get_quiz_prompt(
                quiz_request.week_number,
                quiz_request.topics
            )
            
            quiz_data = await self.llm.generate_completion(prompt, max_tokens=2000)
            
            return QuizResponse(
                week_number=quiz_request.week_number,
                **quiz_data
            )
            
        except Exception as e:
            raise Exception(f"Error generating quiz: {str(e)}")
