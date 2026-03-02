from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.models import User

# 导出常用依赖
__all__ = ["get_db", "get_current_user"]