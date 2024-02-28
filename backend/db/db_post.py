from sqlalchemy.orm.session import Session
from sqlalchemy import select


from db.models import Post
from routers.schemas import PostBase
from datetime import datetime


def create(db:Session,request:PostBase ):
    new_post = Post(
        **request.model_dump(exclude={'creator_id'}), 
        timestamp=datetime.now(),
        user_id=request.creator_id
        )
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post




def get_all(db:Session):
    res = db.execute(select(Post)).scalars().all()
    return res