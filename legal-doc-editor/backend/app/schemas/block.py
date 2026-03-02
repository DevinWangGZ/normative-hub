from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional, Dict, Any, List

from app.models.models import BlockType


class BlockBase(BaseModel):
    block_type: BlockType
    content: Dict[str, Any]
    order: int
    parent_id: Optional[str] = None
    level: int = 0
    article_number: Optional[str] = None
    meta_data: Optional[Dict[str, Any]] = None


class BlockCreate(BlockBase):
    document_id: str


class BlockUpdate(BaseModel):
    block_type: Optional[BlockType] = None
    content: Optional[Dict[str, Any]] = None
    order: Optional[int] = None
    parent_id: Optional[str] = None
    level: Optional[int] = None
    article_number: Optional[str] = None
    meta_data: Optional[Dict[str, Any]] = None


class BlockResponse(BlockBase):
    model_config = ConfigDict(from_attributes=True)
    
    id: str
    document_id: str
    created_at: datetime
    updated_at: datetime
