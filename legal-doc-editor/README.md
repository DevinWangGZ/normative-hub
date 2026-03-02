# Legal Doc Editor

在线法律文书/标准/规范编辑器

## 技术栈

- **Backend**: FastAPI + SQLAlchemy + PostgreSQL + Redis
- **Frontend**: React 18 + TypeScript + Tailwind + TipTap
- **DevOps**: Docker + Docker Compose

## 快速开始

```bash
# 启动所有服务
docker-compose up -d

# 后端开发
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload

# 前端开发
cd frontend
npm install
npm run dev
```

## 功能特性

- 📄 结构化文档编辑（自动条款编号）
- 👥 实时多人协作
- 💬 批注与评论
- 🔗 智能引用管理
- 📋 模板库
- 📤 导出 Word/PDF

## 项目结构

```
legal-doc-editor/
├── backend/          # FastAPI 后端
├── frontend/         # React 前端
├── docker/           # Docker 配置
└── docker-compose.yml
```
