import redis
import json
from app.config import get_settings
from typing import Optional

settings = get_settings()

class CacheService:
    def __init__(self):
        try:
            self.redis_client = redis.from_url(
                settings.redis_url,
                decode_responses=True
            )
            self.redis_client.ping()
            self.enabled = True
        except:
            print("⚠️  Redis not available, caching disabled")
            self.enabled = False
    
    def get(self, key: str) -> Optional[dict]:
        """Get cached value"""
        if not self.enabled:
            return None
        try:
            value = self.redis_client.get(key)
            return json.loads(value) if value else None
        except:
            return None
    
    def set(self, key: str, value: dict, expire: int = 3600):
        """Set cached value with expiration (default 1 hour)"""
        if not self.enabled:
            return
        try:
            self.redis_client.setex(key, expire, json.dumps(value))
        except:
            pass