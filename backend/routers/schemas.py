from pydantic import BaseModel
from pydantic import ConfigDict
from datetime import datetime

class UserBase(BaseModel):
    username:str
    email:str
    password:str


class UserDisplay(BaseModel):
    username:str
    email:str
    
    model_config = ConfigDict(from_attributes=True)
    
    
    
#for post display    
class User(BaseModel):
    username:str

    
    
class PostBase(BaseModel):
    image_url:str 
    image_url_type:str
    caption:str
    creator_id:int
    
    
    
class PostDisplay(BaseModel):
    id:int
    image_url:str
    image_url_type:str
    caption:str
    timestamp:datetime
    user: User
    
    model_config = ConfigDict(from_attributes=True)
    