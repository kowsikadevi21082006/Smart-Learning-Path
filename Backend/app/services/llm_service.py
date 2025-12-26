import google.generativeai as genai
import json
from app.config import get_settings

settings = get_settings()

# Configure Gemini API
genai.configure(api_key=settings.gemini_api_key)

class LLMService:
    def __init__(self):
        self.model = genai.GenerativeModel(settings.gemini_model)
    
    async def generate_completion(self, prompt: str, max_tokens: int = 4000) -> dict:
        """Generate completion from Gemini API"""
        try:
            # Generate response using Gemini
            response = self.model.generate_content(
                prompt,
                generation_config=genai.types.GenerationConfig(
                    max_output_tokens=max_tokens,
                    temperature=0.7
                )
            )
            
            # Extract text content
            response_text = response.text
            
            # Parse JSON response
            # Remove markdown code blocks if present
            cleaned_text = response_text.strip()
            if cleaned_text.startswith("```json"):
                cleaned_text = cleaned_text[7:]
            if cleaned_text.startswith("```"):
                cleaned_text = cleaned_text[3:]
            if cleaned_text.endswith("```"):
                cleaned_text = cleaned_text[:-3]
            
            cleaned_text = cleaned_text.strip()
            
            return json.loads(cleaned_text)
            
        except json.JSONDecodeError as e:
            raise ValueError(f"Failed to parse LLM response as JSON: {str(e)}")
        except Exception as e:
            raise Exception(f"LLM API error: {str(e)}")