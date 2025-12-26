from pydantic_settings import BaseSettings
from functools import lru_cache
from typing import List

class Settings(BaseSettings):
    # ========== REQUIRED SETTINGS ==========
    cerebras_api_key: str
    mongodb_atlas_uri: str
    
    # ========== OPTIONAL WITH DEFAULTS ==========
    # MongoDB
    mongodb_db_name: str = "ai_db"
    mongodb_collection_name: str = "learning_paths"
    mongodb_index_name: str = "vector_index"
    
    # Redis (Optional - only needed if you want caching)
    redis_url: str = "redis://localhost:6379"
    
    # App Settings
    debug: bool = True
    api_version: str = "v1"
    
    # CORS - can be a string or list
    cors_origins: str = "http://localhost:3000,http://localhost:5173"
    
    # LLM Settings - Cerebras
    cerebras_model: str = "llama-3.3-70b"
    max_tokens: int = 4000
    
    @property
    def cors_origins_list(self) -> List[str]:
        """Convert comma-separated string to list"""
        if isinstance(self.cors_origins, str):
            return [origin.strip() for origin in self.cors_origins.split(",")]
        return self.cors_origins
    
    class Config:
        env_file = ".env"
        case_sensitive = False
        # Allow extra fields in .env without errors
        extra = "ignore"

@lru_cache()
def get_settings():
    return Settings()