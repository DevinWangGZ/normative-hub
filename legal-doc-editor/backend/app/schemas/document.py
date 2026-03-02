from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional, Dict, Any, List

from app.models.models import DocType, DocStatus


class DocumentBase(BaseModel):
    title: str
    description: Optional[str] = None
    doc_type: DocType = DocType.CONTRACT
    meta_data: Optional[Dict[str, Any]] = None


class DocumentCreate(DocumentBase):
    pass


class DocumentUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[DocStatus] = None
    meta_data: Optional[Dict[str, Any]] = None


class DocumentResponse(DocumentBase):
    model_config = ConfigDict(from_attributes=True)
    
    id: str
    status: DocStatus
    version: int
    owner_id: str
    created_at: datetime
    updated_at: datetime
    published_at: Optional[datetime] = None
