from pydantic import BaseModel
from typing import List

class QuizOption(BaseModel):
    text: str
    is_correct: bool

class QuizQuestion(BaseModel):
    question: str
    options: List[QuizOption]
    explanation: str

class QuizRequest(BaseModel):
    week_number: int
    topics: List[str]

class QuizResponse(BaseModel):
    week_number: int
    questions: List[QuizQuestion]