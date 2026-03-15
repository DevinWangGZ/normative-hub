# Legal Doc Editor

在线法律文书/标准/规范编辑器

## 技术栈

- **Backend**: FastAPI + SQLAlchemy + MySQL
- **Frontend**: React 18 + TypeScript + Tailwind + TipTap
- **DevOps**: Docker + Docker Compose

## 快速开始

### 方式一：本地开发（推荐）

**1. 准备数据库**
```sql
CREATE DATABASE legaldoc CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

**2. 配置后端**
```bash
cd backend
python3.12 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

创建 `.env` 文件：
```bash
DATABASE_URL=mysql+aiomysql://root:password@localhost:3306/legaldoc
SECRET_KEY=your-secret-key
```

**3. 启动服务**
```bash
# 终端1 - 后端
uvicorn app.main:app --reload --port 9000

# 终端2 - 前端
cd frontend
npm install
npm run dev
```

### 方式二：Docker 启动

```bash
docker-compose up -d
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
