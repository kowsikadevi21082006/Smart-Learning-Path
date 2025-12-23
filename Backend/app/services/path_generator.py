from app.services.llm_service import LLMService
from app.services.vector_service import VectorService
from app.models.learning_path import UserInput, LearningPath, LearningPathResponse
from app.models.quiz import QuizRequest, QuizResponse
from app.utils.prompts import get_learning_path_prompt, get_quiz_prompt

class PathGeneratorService:
    def __init__(self):
        self.llm = LLMService()
        self.vector_store = VectorService()
    
    async def generate_learning_path(self, user_input: UserInput) -> LearningPathResponse:
        """Generate a complete learning path"""
        try:
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