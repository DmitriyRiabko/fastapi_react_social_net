from sqlalchemy.orm.session import Session
from sqlalchemy import select
from fastapi import HTTPException, status


from db.models import Comment
from routers.schemas import CommentBase
from datetime import datetime


def create(db: Session, request: CommentBase):
    new_comment = Comment(**request.model_dump(), timestamp=datetime.now())
    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)
    return new_comment


def get_all(db: Session, post_id: int):
    return db.execute(select(Comment).where(Comment.id == post_id)).scalars().all()
