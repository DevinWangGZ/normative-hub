from fastapi import APIRouter, Depends
from app.models.models import User
from app.api.deps import get_current_user

router = APIRouter()


@router.get("/me")
async def get_me(current_user: User = Depends(get_current_user)):
    """获取当前用户信息"""
    return current_user