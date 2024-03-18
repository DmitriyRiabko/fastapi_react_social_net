from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import sys

from db.database import engine
from db import models
from auth import auth

from routers import user, post, comment


app = FastAPI(title="Social Network API")
app.include_router(user.router)
app.include_router(post.router)
app.include_router(auth.router)
app.include_router(comment.router)


origins = [
    "http://localhost:5173",
    "http://10.0.0.105:5173",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


models.Base.metadata.create_all(engine)


app.mount("/images", StaticFiles(directory="images"), name="images")


if __name__ == "__main__":
    if "--global" in sys.argv:
        uvicorn.run(app="main:app", host="0.0.0.0", port=5555, reload=True)
    else:
        uvicorn.run(app="main:app", port=5555, reload=True)
