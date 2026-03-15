#!/bin/bash
# 推荐方案安装脚本 - 带时间记录

SKILLS_STAGE1=("summarize" "github" "wacli")
SKILLS_STAGE2=("agent-browser")
SKILLS_STAGE3=("capability-evolver")

WORKDIR="/root/.openclaw/workspace/skills"
LOGFILE="/root/.openclaw/workspace/skills/install_recommended.log"

mkdir -p "$WORKDIR"
cd "$WORKDIR"

echo "=== OpenClaw Skills 推荐方案安装 ===" | tee "$LOGFILE"
echo "开始时间: $(date '+%Y-%m-%d %H:%M:%S')" | tee -a "$LOGFILE"
echo "" | tee -a "$LOGFILE"

install_skill() {
    local skill=$1
    local start_time=$(date +%s)
    
    echo "[$skill] 开始安装... ($(date '+%H:%M:%S'))" | tee -a "$LOGFILE"
    
    if timeout 180 clawhub install "$skill" --force 2>&1 | tee -a "$LOGFILE"; then
        local end_time=$(date +%s)
        local duration=$((end_time - start_time))
        echo "[$skill] ✓ 安装成功 (${duration}秒)" | tee -a "$LOGFILE"
        return 0
    else
        local end_time=$(date +%s)
        local duration=$((end_time - start_time))
        echo "[$skill] ✗ 安装失败或超时 (${duration}秒)" | tee -a "$LOGFILE"
        return 1
    fi
}

# 阶段1: 基础工具
echo "【阶段1/3】安装基础工具..." | tee -a "$LOGFILE"
for skill in "${SKILLS_STAGE1[@]}"; do
    install_skill "$skill"
    echo "等待 10 秒..." | tee -a "$LOGFILE"
    sleep 10
done

echo "" | tee -a "$LOGFILE"
echo "【阶段2/3】安装自动化工具..." | tee -a "$LOGFILE"
for skill in "${SKILLS_STAGE2[@]}"; do
    install_skill "$skill"
    echo "等待 10 秒..." | tee -a "$LOGFILE"
    sleep 10
done

echo "" | tee -a "$LOGFILE"
echo "【阶段3/3】安装 AI 进化工具..." | tee -a "$LOGFILE"
echo "注意: 不安装 self-improving-agent 以避免冲突" | tee -a "$LOGFILE"
for skill in "${SKILLS_STAGE3[@]}"; do
    install_skill "$skill"
done

echo "" | tee -a "$LOGFILE"
echo "=== 安装完成 ===" | tee -a "$LOGFILE"
echo "结束时间: $(date '+%Y-%m-%d %H:%M:%S')" | tee -a "$LOGFILE"
echo "" | tee -a "$LOGFILE"

echo "已安装的技能:" | tee -a "$LOGFILE"
clawhub list 2>&1 | tee -a "$LOGFILE"

echo "" | tee -a "$LOGFILE"
echo "安装的目录:" | tee -a "$LOGFILE"
ls -la "$WORKDIR"/ | grep -v "^d.*\.$" | tee -a "$LOGFILE"
