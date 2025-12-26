import os
from app.config import get_settings
from typing import Optional, Dict, Any
import uuid

settings = get_settings()

class VectorService:
    def __init__(self):
        """Initialize MongoDB connection - made optional for development"""
        self.client = None
        self.db = None
        self.collection = None
        self._in_memory_store = {}  # Fallback for when MongoDB is not available
        
        # Try to connect to MongoDB, but don't fail if not available
        if settings.mongodb_atlas_uri and "placeholder" not in settings.mongodb_atlas_uri:
            try:
                from pymongo import MongoClient
                self.client = MongoClient(settings.mongodb_atlas_uri, serverSelectionTimeoutMS=5000)
                # Test connection
                self.client.server_info()
                self.db = self.client[settings.mongodb_db_name]
                self.collection = self.db[settings.mongodb_collection_name]
                print("✅ MongoDB connected successfully")
            except Exception as e:
                print(f"⚠️ MongoDB not available, using in-memory storage: {e}")
                self.client = None
        else:
            print("⚠️ MongoDB not configured, using in-memory storage")
    
    async def store_learning_path(self, learning_path: dict) -> str:
        """Store learning path in MongoDB or in-memory"""
        try:
            if self.collection is not None:
                result = self.collection.insert_one(learning_path)
                return str(result.inserted_id)
            else:
                # In-memory fallback
                path_id = str(uuid.uuid4())
                self._in_memory_store[path_id] = learning_path
                return path_id
        except Exception as e:
            raise Exception(f"Error storing learning path: {str(e)}")
    
    async def get_learning_path(self, path_id: str) -> Optional[Dict[str, Any]]:
        """Retrieve learning path by ID"""
        try:
            if self.collection is not None:
                from bson.objectid import ObjectId
                path = self.collection.find_one({"_id": ObjectId(path_id)})
                if path:
                    path['_id'] = str(path['_id'])
                return path
            else:
                # In-memory fallback
                return self._in_memory_store.get(path_id)
        except Exception as e:
            raise Exception(f"Error retrieving learning path: {str(e)}")
    
    async def get_all_learning_paths(self, limit: int = 10) -> list:
        """Retrieve all learning paths"""
        try:
            if self.collection is not None:
                paths = list(self.collection.find().limit(limit))
                for path in paths:
                    path['_id'] = str(path['_id'])
                return paths
            else:
                # In-memory fallback
                return list(self._in_memory_store.values())[:limit]
        except Exception as e:
            raise Exception(f"Error retrieving learning paths: {str(e)}")
    
    async def delete_learning_path(self, path_id: str) -> bool:
        """Delete a learning path by ID"""
        try:
            if self.collection is not None:
                from bson.objectid import ObjectId
                result = self.collection.delete_one({"_id": ObjectId(path_id)})
                return result.deleted_count > 0
            else:
                # In-memory fallback
                if path_id in self._in_memory_store:
                    del self._in_memory_store[path_id]
                    return True
                return False
        except Exception as e:
            raise Exception(f"Error deleting learning path: {str(e)}")
    
    def close(self):
        """Close MongoDB connection"""
        if self.client:
            self.client.close()