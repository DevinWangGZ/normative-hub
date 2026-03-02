from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
from uuid import UUID

from app.core.database import get_db
from app.models.models import Block, Document, BlockType
from app.schemas.block import BlockCreate, BlockUpdate, BlockResponse
from app.api.deps import get_current_user

router = APIRouter()


@router.post("", response_model=BlockResponse)
async def create_block(
    block_in: BlockCreate,
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """创建内容块"""
    # 验证文档存在且用户有权限
    doc_query = select(Document).where(Document.id == block_in.document_id)
    result = await db.execute(doc_query)
    document = result.scalar_one_or_none()
    
    if not document:
        raise HTTPException(status_code=404, detail="文档不存在")
    
    block = Block(
        document_id=block_in.document_id,
        block_type=block_in.block_type,
        content=block_in.content,
        order=block_in.order,
        parent_id=block_in.parent_id,
        level=block_in.level,
        article_number=block_in.article_number,
        metadata=block_in.metadata or {}
    )
    db.add(block)
    await db.flush()
    await db.refresh(block)
    return block


@router.get("/document/{doc_id}", response_model=List[BlockResponse])
async def get_document_blocks(
    doc_id: UUID,
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """获取文档的所有内容块"""
    query = select(Block).where(Block.document_id == doc_id).order_by(Block.order)
    result = await db.execute(query)
    return result.scalars().all()


@router.put("/{block_id}", response_model=BlockResponse)
async def update_block(
    block_id: UUID,
    block_in: BlockUpdate,
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """更新内容块"""
    query = select(Block).where(Block.id == block_id)
    result = await db.execute(query)
    block = result.scalar_one_or_none()
    
    if not block:
        raise HTTPException(status_code=404, detail="内容块不存在")
    
    update_data = block_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(block, field, value)
    
    await db.flush()
    await db.refresh(block)
    return block


@router.delete("/{block_id}")
async def delete_block(
    block_id: UUID,
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """删除内容块"""
    query = select(Block).where(Block.id == block_id)
    result = await db.execute(query)
    block = result.scalar_one_or_none()
    
    if not block:
        raise HTTPException(status_code=404, detail="内容块不存在")
    
    await db.delete(block)
    await db.flush()
    
    return {"message": "内容块已删除"}