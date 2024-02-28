from sqlalchemy.orm.session import Session


from routers.schemas import UserBase, UserDisplay
from .models import User
from .hash import Hash 


def create_user(db: Session, request: UserBase):
    new_user = User(
        username=request.username, email=request.email, 
        password= Hash.bcrypt(request.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user