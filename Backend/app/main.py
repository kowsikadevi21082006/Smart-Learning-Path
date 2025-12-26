from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response

app = FastAPI()

# ✅ CORS — allow EVERYTHING (TEMPORARY)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ OPTIONS handler (THIS IS THE KEY FIX)
@app.options("/{path:path}")
async def options_handler(path: str):
    return Response(status_code=200)

@app.post("/learning-paths/generate")
async def generate_learning_path(payload: dict):
    return {"status": "CORS WORKING"}
