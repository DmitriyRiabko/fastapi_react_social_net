from fastapi import APIRouter, Depends, status
from sqlalchemy.orm.session import Session

from .schemas import UserDisplay, UserBase
from db.database import get_db
from db import db_user


router = APIRouter(prefix="/user", tags=["user"])


@router.post("", response_model=UserDisplay, status_code=status.HTTP_201_CREATED)
def create_user(request: UserBase, db: Session = Depends(get_db)):
    return db_user.create_user(db, request)


@router.get("", response_model=UserDisplay)
def get_user_by_username(request: str, db: Session = Depends(get_db)):
    return db_user.get_user_by_username(db, request)


