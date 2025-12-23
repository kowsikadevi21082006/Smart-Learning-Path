import os
from pymongo import MongoClient
from llama_index.vector_stores.mongodb import MongoDBAtlasVectorStore
from llama_index.core import VectorStoreIndex, StorageContext
from app.config import get_settings

settings = get_settings()

class VectorService:
    def __init__(self):
        self.client = MongoClient(settings.mongodb_atlas_uri)
        self.db = self.client[settings.mongodb_db_name]
        self.collection = self.db[settings.mongodb_collection_name]
        
        # Initialize vector store
        self.vector_store = MongoDBAtlasVectorStore(
            mongodb_client=self.client,
            db_name=settings.mongodb_db_name,
            collection_name=settings.mongodb_collection_name,
            index_name=settings.mongodb_index_name
        )
    
    async def store_learning_path(self, learning_path: dict) -> str:
        """Store learning path in MongoDB"""
        result = self.collection.insert_one(learning_path)
        return str(result.inserted_id)
    
    async def get_learning_path(self, path_id: str) -> dict:
        """Retrieve learning path by ID"""
        from bson.objectid import ObjectId
        return self.collection.find_one({"_id": ObjectId(path_id)})
    
    async def search_similar_paths(self, query: str, limit: int = 5):
        """Search for similar learning paths (future enhancement)"""
        # This would use vector similarity search
        pass