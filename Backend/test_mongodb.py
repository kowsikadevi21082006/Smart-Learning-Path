from pymongo import MongoClient
from app.config import get_settings
import sys

def test_mongodb_connection():
    """Test MongoDB Atlas connection"""
    try:
        settings = get_settings()
        print("🔍 Testing MongoDB connection...")
        print(f"📍 URI: {settings.mongodb_atlas_uri[:30]}...")
        
        # Connect to MongoDB
        client = MongoClient(settings.mongodb_atlas_uri, serverSelectionTimeoutMS=5000)
        
        # Test connection
        client.admin.command('ping')
        print("✅ MongoDB connection successful!")
        
        # List databases
        databases = client.list_database_names()
        print(f"📊 Available databases: {databases}")
        
        # Check if our database exists
        db = client[settings.mongodb_db_name]
        collections = db.list_collection_names()
        print(f"📁 Collections in '{settings.mongodb_db_name}': {collections}")
        
        # Test write operation
        test_collection = db['test_collection']
        result = test_collection.insert_one({"test": "data", "status": "connected"})
        print(f"✅ Write test successful! ID: {result.inserted_id}")
        
        # Test read operation
        doc = test_collection.find_one({"_id": result.inserted_id})
        print(f"✅ Read test successful! Data: {doc}")
        
        # Cleanup
        test_collection.delete_one({"_id": result.inserted_id})
        print("🧹 Cleanup completed")
        
        client.close()
        print("\n✅ ALL MONGODB TESTS PASSED!")
        return True
        
    except Exception as e:
        print(f"\n❌ MongoDB connection failed!")
        print(f"Error: {str(e)}")
        print("\n📝 Troubleshooting steps:")
        print("1. Check your MONGODB_ATLAS_URI in .env file")
        print("2. Verify MongoDB Atlas IP whitelist includes your IP")
        print("3. Confirm database user credentials are correct")
        return False

if __name__ == "__main__":
    success = test_mongodb_connection()
    sys.exit(0 if success else 1)