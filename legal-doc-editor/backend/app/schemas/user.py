from pydantic import BaseModel, ConfigDict, EmailStr
from datetime import datetime
from typing import Optional


class UserBase(BaseModel):
    email: EmailStr
    username: str
    full_name: Optional[str] = None


class UserCreate(UserBase):
    password: str


class UserResponse(UserBase):
    model_config = ConfigDict(from_attributes=True)
    
    id: str
    avatar_url: Optional[str] = None
    is_active: bool = True
    created_at: datetime


class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse
