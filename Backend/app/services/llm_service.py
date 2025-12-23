import anthropic
import json
from app.config import get_settings

settings = get_settings()

class LLMService:
    def __init__(self):
        self.client = anthropic.Anthropic(api_key=settings.anthropic_api_key)
    
    async def generate_completion(self, prompt: str, max_tokens: int = 4000) -> dict:
        """Generate completion from Claude API"""
        try:
            message = self.client.messages.create(
                model=settings.claude_model,
                max_tokens=max_tokens,
                messages=[
                    {"role": "user", "content": prompt}
                ]
            )
            
            # Extract text content
            response_text = message.content[0].text
            
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