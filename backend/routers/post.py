from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm.session import Session
from typing import List


from db.database import get_db
from db import db_post
from .schemas import PostBase, PostDisplay


router = APIRouter(prefix="/post", tags=["post"])

image_url_type = ["absolute", "relative"]


@router.post("/", response_model=PostDisplay)
def create(request: PostBase, db: Session = Depends(get_db)):
    if not request.image_url_type in image_url_type:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="image_url_type only 'absolute' or 'relative'",
        )
    return db_post.create(db, request)



@router.get('/all',response_model=List[PostDisplay])
def posts(db:Session= Depends(get_db)):
    return db_post.get_all(db)