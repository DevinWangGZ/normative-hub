import uuid
from datetime import datetime
from typing import List, Optional
from enum import Enum

from sqlalchemy import Column, String, DateTime, ForeignKey, Text, Integer, Enum as SQLEnum, JSON
from sqlalchemy.orm import relationship

from app.core.database import Base


class DocType(str, Enum):
    CONTRACT = "contract"           # 合同
    REGULATION = "regulation"       # 规范
    LEGAL = "legal"                 # 法律文件
    POLICY = "policy"               # 公司制度
    STANDARD = "standard"           # 标准


class BlockType(str, Enum):
    HEADING = "heading"             # 标题
    PARAGRAPH = "paragraph"         # 段落
    ARTICLE = "article"             # 条款
    LIST_ITEM = "list_item"         # 列表项
    TABLE = "table"                 # 表格
    REFERENCE = "reference"         # 引用


class DocStatus(str, Enum):
    DRAFT = "draft"                 # 草稿
    EDITING = "editing"             # 编辑中
    REVIEWING = "reviewing"         # 审核中
    PUBLISHED = "published"         # 已发布
    ARCHIVED = "archived"           # 已归档


class User(Base):
    """用户模型"""
    __tablename__ = "users"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String(255), unique=True, nullable=False, index=True)
    username = Column(String(100), unique=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(100))
    avatar_url = Column(String(500))
    is_active = Column(Integer, default=1)
    is_superuser = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # 关系
    documents = relationship("Document", back_populates="owner", lazy="selectin")
    comments = relationship("Comment", back_populates="author", lazy="selectin")


class Document(Base):
    """文档模型"""
    __tablename__ = "documents"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String(255), nullable=False)
    description = Column(Text)
    doc_type = Column(SQLEnum(DocType), default=DocType.CONTRACT)
    status = Column(SQLEnum(DocStatus), default=DocStatus.DRAFT)
    
    # 版本控制
    version = Column(Integer, default=1)
    parent_id = Column(String(36), ForeignKey("documents.id"), nullable=True)
    
    # 所有者
    owner_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    
    # 元数据
    meta_data = Column(JSON, default=dict)  # 存储额外信息如行业、标签等
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    published_at = Column(DateTime, nullable=True)
    
    # 关系
    owner = relationship("User", back_populates="documents", lazy="selectin")
    blocks = relationship("Block", back_populates="document", lazy="selectin", order_by="Block.order")
    comments = relationship("Comment", back_populates="document", lazy="selectin")
    collaborators = relationship("DocumentCollaborator", back_populates="document", lazy="selectin")


class Block(Base):
    """文档内容块 - 类似Notion的块级存储"""
    __tablename__ = "blocks"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    document_id = Column(String(36), ForeignKey("documents.id"), nullable=False)
    
    block_type = Column(SQLEnum(BlockType), nullable=False)
    content = Column(JSON, default=dict)  # 存储富文本内容
    
    # 层级结构
    order = Column(Integer, nullable=False)  # 在文档中的顺序
    parent_id = Column(String(36), ForeignKey("blocks.id"), nullable=True)
    level = Column(Integer, default=0)  # 层级深度
    
    # 条款编号（自动生成）
    article_number = Column(String(50), nullable=True)
    
    # 元数据
    meta_data = Column(JSON, default=dict)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # 关系
    document = relationship("Document", back_populates="blocks", lazy="selectin")
    references_from = relationship("Reference", foreign_keys="Reference.source_block_id", back_populates="source_block", lazy="selectin")
    references_to = relationship("Reference", foreign_keys="Reference.target_block_id", back_populates="target_block", lazy="selectin")


class Reference(Base):
    """引用关系 - 支持双向引用追踪"""
    __tablename__ = "references"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    
    # 源引用
    source_block_id = Column(String(36), ForeignKey("blocks.id"), nullable=False)
    source_doc_id = Column(String(36), ForeignKey("documents.id"), nullable=False)
    
    # 目标引用
    target_block_id = Column(String(36), ForeignKey("blocks.id"), nullable=True)
    target_doc_id = Column(String(36), ForeignKey("documents.id"), nullable=False)
    
    # 引用类型
    ref_type = Column(String(50), default="internal")  # internal / external_law
    
    # 是否自动更新
    auto_update = Column(Integer, default=1)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # 关系
    source_block = relationship("Block", foreign_keys=[source_block_id], back_populates="references_from", lazy="selectin")
    target_block = relationship("Block", foreign_keys=[target_block_id], back_populates="references_to", lazy="selectin")


class Comment(Base):
    """评论/批注"""
    __tablename__ = "comments"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    document_id = Column(String(36), ForeignKey("documents.id"), nullable=False)
    author_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    
    content = Column(Text, nullable=False)
    
    # 关联的块和位置
    block_id = Column(String(36), ForeignKey("blocks.id"), nullable=True)
    position = Column(JSON, nullable=True)  # 文本选区位置
    
    # 回复
    parent_id = Column(String(36), ForeignKey("comments.id"), nullable=True)
    
    # 状态
    is_resolved = Column(Integer, default=0)
    resolved_at = Column(DateTime, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # 关系
    document = relationship("Document", back_populates="comments", lazy="selectin")
    author = relationship("User", back_populates="comments", lazy="selectin")


class DocumentCollaborator(Base):
    """文档协作者"""
    __tablename__ = "document_collaborators"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    document_id = Column(String(36), ForeignKey("documents.id"), nullable=False)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    
    # 权限: viewer, editor, admin
    role = Column(String(20), default="viewer")
    
    joined_at = Column(DateTime, default=datetime.utcnow)
    
    # 关系
    document = relationship("Document", back_populates="collaborators", lazy="selectin")
    user = relationship("User", lazy="selectin")


class Template(Base):
    """文档模板"""
    __tablename__ = "templates"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(255), nullable=False)
    description = Column(Text)
    doc_type = Column(SQLEnum(DocType), nullable=False)
    
    # 模板内容（预定义的blocks）
    content = Column(JSON, default=list)
    
    # 分类标签
    tags = Column(JSON, default=list)
    industry = Column(String(100))  # 适用行业
    
    is_public = Column(Integer, default=1)
    created_by = Column(String(36), ForeignKey("users.id"))
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
