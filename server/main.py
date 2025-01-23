from fastapi import FastAPI
from router import router as api_router

app = FastAPI()

# Include the items router
app.include_router(api_router)

@app.get("/")
async def root():
    return {"message": "Welcome to the FastAPI MongoDB App!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="debug")