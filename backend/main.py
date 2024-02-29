from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from db.database import engine
from db import models
from auth import auth

from routers import user, post



app = FastAPI(title="Social Network API")
app.include_router(user.router)
app.include_router(post.router)
app.include_router(auth.router)



models.Base.metadata.create_all(engine)


app.mount("/images", StaticFiles(directory="images"), name="images")
