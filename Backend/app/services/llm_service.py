from cerebras.cloud.sdk import Cerebras
import json
from app.config import get_settings

settings = get_settings()

class LLMService:
    def __init__(self):
        self.client = Cerebras(api_key=settings.cerebras_api_key)
        self.model = settings.cerebras_model
    
    async def generate_completion(self, prompt: str, max_tokens: int = 4000) -> dict:
        """Generate completion from Cerebras API"""
        try:
            # Generate response using Cerebras (OpenAI-compatible API)
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "user", "content": prompt}
                ],
                max_tokens=max_tokens,
                temperature=0.7
            )
            
            # Extract text content
            response_text = response.choices[0].message.content
            
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