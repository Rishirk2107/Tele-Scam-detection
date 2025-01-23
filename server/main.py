from fastapi import FastAPI
from router import router as api_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can specify a list of allowed origins (e.g., ["http://localhost:3000"])
    allow_credentials=True,
    allow_methods=["*"],  # You can specify allowed HTTP methods (e.g., ["GET", "POST"])
    allow_headers=["*"],  # You can specify allowed headers (e.g., ["Content-Type"])
)

# Include the items router
app.include_router(api_router)

@app.get("/")
async def root():
    return {"message": "Welcome to the FastAPI MongoDB App!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="debug")