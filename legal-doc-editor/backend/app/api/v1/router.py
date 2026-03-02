from fastapi import APIRouter

from app.api.v1.endpoints import auth, documents, blocks, comments, templates, users

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["认证"])
api_router.include_router(users.router, prefix="/users", tags=["用户"])
api_router.include_router(documents.router, prefix="/documents", tags=["文档"])
api_router.include_router(blocks.router, prefix="/blocks", tags=["内容块"])
api_router.include_router(comments.router, prefix="/comments", tags=["评论"])
api_router.include_router(templates.router, prefix="/templates", tags=["模板"])