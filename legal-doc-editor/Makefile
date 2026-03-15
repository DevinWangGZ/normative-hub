.PHONY: help install backend frontend dev stop clean docker-up docker-down

# 默认显示帮助
help:
	@echo "Legal Doc Editor - 可用命令"
	@echo ""
	@echo "本地开发:"
	@echo "  make install       安装前后端依赖"
	@echo "  make backend       启动后端服务 (端口 9000)"
	@echo "  make frontend      启动前端服务 (端口 3001)"
	@echo "  make dev           同时启动前后端 (需要 tmux 或两个终端)"
	@echo ""
	@echo "Docker:"
	@echo "  make docker-up     Docker 方式启动所有服务"
	@echo "  make docker-down   停止 Docker 服务"
	@echo ""
	@echo "其他:"
	@echo "  make stop          停止所有本地服务"
	@echo "  make clean         清理缓存和日志"

# 安装依赖
install:
	@echo "安装后端依赖..."
	cd backend && pip install -r requirements.txt
	@echo "安装前端依赖..."
	cd frontend && npm install
	@echo "✅ 依赖安装完成"

# 启动后端
backend:
	@echo "启动后端服务 (http://localhost:9000)..."
	cd backend && uvicorn app.main:app --reload --host 0.0.0.0 --port 9000

# 启动前端
frontend:
	@echo "启动前端服务 (http://localhost:3001)..."
	cd frontend && npm run dev -- --host 0.0.0.0

# 开发模式（使用后台进程）
dev:
	@echo "启动开发环境..."
	@make -j2 backend frontend

# 停止所有服务
stop:
	@echo "停止所有服务..."
	@-pkill -f "uvicorn.*9000" 2>/dev/null || true
	@-pkill -f "vite.*3001" 2>/dev/null || true
	@echo "✅ 服务已停止"

# 清理缓存
clean:
	@echo "清理缓存..."
	@find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
	@find . -type f -name "*.pyc" -delete 2>/dev/null || true
	@rm -rf backend/.pytest_cache 2>/dev/null || true
	@rm -f /tmp/backend.log /tmp/frontend.log 2>/dev/null || true
	@echo "✅ 清理完成"

# Docker 启动
docker-up:
	@echo "Docker 启动所有服务..."
	docker-compose up -d
	@echo "✅ 服务已启动"
	@echo "前端: http://localhost:3001"
	@echo "后端: http://localhost:9000"

# Docker 停止
docker-down:
	@echo "停止 Docker 服务..."
	docker-compose down
	@echo "✅ Docker 服务已停止"

# 数据库初始化（可选）
db-init:
	@echo "请手动执行以下 SQL："
	@echo "CREATE DATABASE legaldoc CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
