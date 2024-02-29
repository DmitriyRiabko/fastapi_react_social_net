from sqlalchemy.orm.session import Session
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException, status

from routers.schemas import UserBase, UserDisplay
from .models import User
from .hash import Hash


def create_user(db: Session, request: UserBase):
    try:
        new_user = User(
            username=request.username,
            email=request.email,
            password=Hash.bcrypt(request.password),
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user
        
    except IntegrityError :
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail='User already exists'
        )


def get_user_by_username(db: Session, username: str):
    stmt = select(User).where(User.username == username)
    result = db.execute(stmt).scalar_one_or_none()
    if not result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with username '{username}' not exist",
        )

    return result
