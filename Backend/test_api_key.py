"""
Gemini API Key Diagnostic Tool
Tests if your Gemini API key is configured correctly.
"""

import os
import sys

def test_api_key():
    print("\n")
    print("🔍 GEMINI API KEY DIAGNOSTIC TOOL")
    print("=" * 60)
    print("This tool will check if your Gemini API key is configured correctly.")
    print("=" * 60)
    print("\n")
    
    # Step 1: Check .env file
    print("=" * 60)
    print("STEP 1: Checking .env file...")
    print("=" * 60)
    
    env_path = os.path.join(os.path.dirname(__file__), '.env')
    
    if not os.path.exists(env_path):
        print("❌ .env file NOT found!")
        print("   Solution: Copy .env.example to .env and add your GEMINI_API_KEY")
        return False
    
    print(f"✅ .env file found at: {env_path}")
    
    # Load .env
    try:
        from dotenv import load_dotenv
        load_dotenv(env_path)
        print("✅ .env file loaded successfully")
    except Exception as e:
        print(f"❌ Error loading .env file: {e}")
        return False
    
    # Check for API key
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        print("❌ GEMINI_API_KEY not found in .env file!")
        print("   Solution: Add GEMINI_API_KEY=your_key_here to your .env file")
        return False
    
    # Mask the key for display
    masked_key = api_key[:8] + "..." + api_key[-4:] if len(api_key) > 12 else "***"
    print(f"✅ GEMINI_API_KEY found: {masked_key}")
    
    # Step 2: Test configuration loading
    print("\n")
    print("=" * 60)
    print("STEP 2: Testing configuration...")
    print("=" * 60)
    
    try:
        from app.config import get_settings
        settings = get_settings()
        print("✅ Configuration loaded successfully")
        masked = settings.gemini_api_key[:8] + "..." + settings.gemini_api_key[-4:]
        print(f"   - API Key: {masked}")
        print(f"   - Gemini Model: {settings.gemini_model}")
        print(f"   - Max Tokens: {settings.max_tokens}")
    except Exception as e:
        print(f"❌ Error loading configuration: {e}")
        print("\n❌ Cannot proceed without valid configuration.")
        return False
    
    # Step 3: Test API connection
    print("\n")
    print("=" * 60)
    print("STEP 3: Testing Gemini API connection...")
    print("=" * 60)
    
    try:
        import google.generativeai as genai
        
        genai.configure(api_key=settings.gemini_api_key)
        model = genai.GenerativeModel(settings.gemini_model)
        
        print("📡 Sending test request to Gemini API...")
        response = model.generate_content("Say 'Hello, the API is working!' in exactly those words.")
        
        print(f"✅ API CONNECTION SUCCESSFUL!")
        print(f"   Response: {response.text[:100]}...")
        
    except Exception as e:
        print(f"❌ API ERROR!")
        print(f"   Error: {e}")
        return False
    
    # Summary
    print("\n")
    print("=" * 60)
    print("DIAGNOSTIC SUMMARY")
    print("=" * 60)
    print("✅ .env file: PASS")
    print("✅ Configuration: PASS")
    print("✅ API Connection: PASS")
    print("=" * 60)
    print("\n🎉 All tests passed! Your Gemini API is ready to use.")
    
    return True

if __name__ == "__main__":
    success = test_api_key()
    if not success:
        print("\n⚠️ Some tests failed. Please follow the solutions above.")
        sys.exit(1)
