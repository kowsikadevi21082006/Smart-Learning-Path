import os
from pymongo import MongoClient
from app.config import get_settings
from typing import Optional, Dict, Any

settings = get_settings()

class VectorService:
    def __init__(self):
        """Initialize MongoDB connection without LlamaIndex vector store for now"""
        self.client = MongoClient(settings.mongodb_atlas_uri)
        self.db = self.client[settings.mongodb_db_name]
        self.collection = self.db[settings.mongodb_collection_name]
    
    async def store_learning_path(self, learning_path: dict) -> str:
        """Store learning path in MongoDB"""
        try:
            result = self.collection.insert_one(learning_path)
            return str(result.inserted_id)
        except Exception as e:
            raise Exception(f"Error storing learning path: {str(e)}")
    
    async def get_learning_path(self, path_id: str) -> Optional[Dict[str, Any]]:
        """Retrieve learning path by ID"""
        try:
            from bson.objectid import ObjectId
            path = self.collection.find_one({"_id": ObjectId(path_id)})
            if path:
                # Convert ObjectId to string for JSON serialization
                path['_id'] = str(path['_id'])
            return path
        except Exception as e:
            raise Exception(f"Error retrieving learning path: {str(e)}")
    
    async def get_all_learning_paths(self, limit: int = 10) -> list:
        """Retrieve all learning paths (for future use)"""
        try:
            paths = list(self.collection.find().limit(limit))
            # Convert ObjectId to string
            for path in paths:
                path['_id'] = str(path['_id'])
            return paths
        except Exception as e:
            raise Exception(f"Error retrieving learning paths: {str(e)}")
    
    async def delete_learning_path(self, path_id: str) -> bool:
        """Delete a learning path by ID"""
        try:
            from bson.objectid import ObjectId
            result = self.collection.delete_one({"_id": ObjectId(path_id)})
            return result.deleted_count > 0
        except Exception as e:
            raise Exception(f"Error deleting learning path: {str(e)}")
    
    def close(self):
        """Close MongoDB connection"""
        self.client.close()