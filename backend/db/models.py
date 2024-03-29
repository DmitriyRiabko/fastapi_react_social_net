from .database import Base
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    email = Column(String)
    password = Column(String, nullable=False)
    
    items = relationship("Post", back_populates="user")


class Post(Base):
    __tablename__ = "posts"
    id = Column(Integer, primary_key=True, index=True )
    image_url = Column(String)
    image_url_type = Column(String)
    caption = Column(String)
    timestamp = Column(DateTime)
    user_id = Column(Integer, ForeignKey("users.id", ondelete='cascade'))
    
    user = relationship("User", back_populates="items")

    comments = relationship('Comment', back_populates='post')


class Comment(Base):
    __tablename__ = 'comments'
    id = Column(Integer, primary_key=True, index=True)
    text = Column(String)
    username = Column(String)
    timestamp = Column(DateTime)
    post_id = Column(Integer, ForeignKey('posts.id'))
    
    post = relationship("Post", back_populates="comments")
    
    
    