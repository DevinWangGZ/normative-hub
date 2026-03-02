from fastapi import APIRouter

router = APIRouter()


@router.get("")
async def list_templates():
    """获取模板列表"""
    return {"message": "模板列表"}