from pydantic_settings import BaseSettings
from typing import List
import os


def parse_cors_hosts(v: str) -> List[str]:
    """解析 CORS 主机列表，支持逗号分隔或 JSON 格式"""
    if not v:
        return ["http://localhost:3001", "http://localhost:5173"]
    if v.startswith('['):
        import json
        return json.loads(v)
    return [host.strip() for host in v.split(',')]


class Settings(BaseSettings):
    PROJECT_NAME: str = "Legal Doc Editor"
    VERSION: str = "0.1.0"
    
    # Database (MySQL async)
    DATABASE_URL: str = "mysql+aiomysql://root:password@localhost:3306/legaldoc"
    
    # Redis (可选，留空则使用本地内存缓存)
    REDIS_URL: str = ""
    
    # Security
    SECRET_KEY: str = "your-secret-key-change-in-production"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    # CORS - 从环境变量读取并解析
    _allowed_hosts_str: str = os.getenv("ALLOWED_HOSTS", "")
    
    @property
    def ALLOWED_HOSTS(self) -> List[str]:
        return parse_cors_hosts(self._allowed_hosts_str)
    
    class Config:
        env_file = ".env"


settings = Settings()