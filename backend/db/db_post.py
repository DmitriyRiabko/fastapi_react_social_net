from sqlalchemy.orm.session import Session
from sqlalchemy import desc, select
from fastapi import HTTPException, status


from db.models import Post
from routers.schemas import PostBase
from datetime import datetime


def create(db: Session, request: PostBase):
    new_post = Post(
        **request.model_dump(exclude={"creator_id"}),
        timestamp=datetime.now(),
        user_id=request.creator_id
    )
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post


def get_all(db: Session):
    res = db.execute(select(Post).order_by(desc(Post.timestamp))).scalars().all()
    return res


def delete_post(db: Session, id: int, user_id: int):
    stmt = select(Post).where(Post.id == id)
    post = db.execute(stmt).scalar_one_or_none()
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Post is not exist"
        )

    if post.user_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Only creator can delete post"
        )
    db.delete(post)
    db.commit()
    return "deleted"
