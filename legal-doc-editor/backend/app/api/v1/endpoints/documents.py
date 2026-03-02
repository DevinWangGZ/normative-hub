from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List

from app.core.database import get_db
from app.models.models import Document, User, DocStatus, DocType
from app.schemas.document import DocumentCreate, DocumentUpdate, DocumentResponse
from app.api.deps import get_current_user

router = APIRouter()


@router.post("", response_model=DocumentResponse)
async def create_document(
    doc_in: DocumentCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """创建新文档"""
    document = Document(
        title=doc_in.title,
        description=doc_in.description,
        doc_type=doc_in.doc_type,
        owner_id=current_user.id,
        metadata=doc_in.metadata or {}
    )
    db.add(document)
    await db.flush()
    await db.refresh(document)
    return document


@router.get("", response_model=List[DocumentResponse])
async def list_documents(
    skip: int = 0,
    limit: int = 20,
    doc_type: DocType = None,
    status: DocStatus = None,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """获取文档列表"""
    query = select(Document).where(Document.owner_id == current_user.id)
    
    if doc_type:
        query = query.where(Document.doc_type == doc_type)
    if status:
        query = query.where(Document.status == status)
    
    query = query.offset(skip).limit(limit).order_by(Document.updated_at.desc())
    result = await db.execute(query)
    return result.scalars().all()


@router.get("/{doc_id}", response_model=DocumentResponse)
async def get_document(
    doc_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """获取文档详情"""
    query = select(Document).where(Document.id == doc_id)
    result = await db.execute(query)
    document = result.scalar_one_or_none()
    
    if not document:
        raise HTTPException(status_code=404, detail="文档不存在")
    
    return document


@router.put("/{doc_id}", response_model=DocumentResponse)
async def update_document(
    doc_id: str,
    doc_in: DocumentUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """更新文档"""
    query = select(Document).where(Document.id == doc_id)
    result = await db.execute(query)
    document = result.scalar_one_or_none()
    
    if not document:
        raise HTTPException(status_code=404, detail="文档不存在")
    
    if document.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="无权限修改此文档")
    
    update_data = doc_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(document, field, value)
    
    await db.flush()
    await db.refresh(document)
    return document


@router.delete("/{doc_id}")
async def delete_document(
    doc_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """删除文档"""
    query = select(Document).where(Document.id == doc_id)
    result = await db.execute(query)
    document = result.scalar_one_or_none()
    
    if not document:
        raise HTTPException(status_code=404, detail="文档不存在")
    
    if document.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="无权限删除此文档")
    
    await db.delete(document)
    await db.flush()
    
    return {"message": "文档已删除"}