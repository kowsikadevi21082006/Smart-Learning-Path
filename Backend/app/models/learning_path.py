from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class UserInput(BaseModel):
    current_skills: str = Field(..., description="User's existing skills")
    target_goal: str = Field(..., description="What they want to achieve")
    hours_per_week: int = Field(..., ge=1, le=40, description="Study hours per week")
    duration_weeks: int = Field(..., ge=1, le=52, description="Total weeks available")
    preferred_learning_style: Optional[str] = Field(None, description="visual/hands-on/reading")

class Resource(BaseModel):
    title: str
    type: str  # "video", "article", "documentation", "practice"
    search_query: str
    estimated_time: str

class WeekTopic(BaseModel):
    week_number: int
    topic: str
    subtopics: List[str]
    why_this_first: str
    prerequisites_covered: List[str]
    resources: List[Resource]
    estimated_hours: float
    key_takeaways: List[str]

class LearningPath(BaseModel):
    id: Optional[str] = None
    user_input: UserInput
    path_title: str
    total_weeks: int
    total_hours: float
    weekly_breakdown: List[WeekTopic]
    final_project: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
class LearningPathResponse(BaseModel):
    success: bool
    learning_path: Optional[LearningPath] = None
    message: str