import uvicorn

from fastapi import FastAPI
from src.app.api.v1.router import html as html_router
from src.app.api.v1.router import router as api_router


app = FastAPI()

app.include_router(api_router, prefix="/api/v1")
app.include_router(html_router, prefix="/api/v1")

if __name__ == "__main__":
    uvicorn.run("src.app.main:app", host="0.0.0.0", port=8001, reload=True)
