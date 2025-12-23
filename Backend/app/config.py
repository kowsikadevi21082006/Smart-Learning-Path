from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    # API Keys
    anthropic_api_key: str
    
    # MongoDB
    mongodb_atlas_uri: str
    mongodb_db_name: str = "ai_db"
    mongodb_collection_name: str = "learning_paths"
    mongodb_index_name: str = "vector_index"
    
    # Redis (Optional)
    redis_url: str = "redis://localhost:6379"
    
    # App Settings
    debug: bool = True
    api_version: str = "v1"
    cors_origins: list = ["http://localhost:3000", "http://localhost:5173"]
    
    # LLM Settings
    claude_model: str = "claude-sonnet-4-20250514"
    max_tokens: int = 4000
    
    class Config:
        env_file = ".env"
        case_sensitive = False

@lru_cache()
def get_settings():
    return Settings()