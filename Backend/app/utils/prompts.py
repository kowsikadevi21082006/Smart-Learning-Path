def get_learning_path_prompt(user_input: dict) -> str:
    return f"""You are an expert academic counselor and curriculum designer. Create a personalized, time-bound learning roadmap.

USER PROFILE:
- Current Skills: {user_input['current_skills']}
- Target Goal: {user_input['target_goal']}
- Time Commitment: {user_input['hours_per_week']} hours/week for {user_input['duration_weeks']} weeks
- Learning Style: {user_input.get('preferred_learning_style', 'mixed')}

REQUIREMENTS:
1. Break down the path into weekly modules that fit within the time constraint
2. For EACH week, provide:
   - A clear topic with 3-5 subtopics
   - "Why this first?" explanation showing prerequisite reasoning
   - Specific, actionable search queries for resources (not generic links)
   - Estimated study time
   - Key takeaways

3. Ensure logical progression: Week N must build on Week N-1
4. Include a final capstone project related to their goal

OUTPUT FORMAT (JSON):
{{
  "path_title": "From [current_skills] to [target_goal]",
  "total_weeks": {user_input['duration_weeks']},
  "total_hours": {user_input['hours_per_week'] * user_input['duration_weeks']},
  "weekly_breakdown": [
    {{
      "week_number": 1,
      "topic": "...",
      "subtopics": ["...", "..."],
      "why_this_first": "...",
      "prerequisites_covered": ["..."],
      "resources": [
        {{
          "title": "...",
          "type": "video/article/practice",
          "search_query": "Search YouTube for: '...'",
          "estimated_time": "2 hours"
        }}
      ],
      "estimated_hours": 6.0,
      "key_takeaways": ["...", "..."]
    }}
  ],
  "final_project": "..."
}}

IMPORTANT: Return ONLY valid JSON, no markdown or extra text."""

def get_quiz_prompt(week_number: int, topics: List[str]) -> str:
    topics_str = ", ".join(topics)
    return f"""Generate 5 multiple-choice questions for Week {week_number} covering: {topics_str}

Each question should:
- Test practical understanding, not just memorization
- Have 4 options with only 1 correct answer
- Include an explanation for the correct answer

OUTPUT FORMAT (JSON):
{{
  "questions": [
    {{
      "question": "...",
      "options": [
        {{"text": "...", "is_correct": false}},
        {{"text": "...", "is_correct": true}},
        {{"text": "...", "is_correct": false}},
        {{"text": "...", "is_correct": false}}
      ],
      "explanation": "..."
    }}
  ]
}}

Return ONLY valid JSON."""