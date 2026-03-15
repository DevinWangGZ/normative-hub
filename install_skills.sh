#!/bin/bash
# 批量安装 ClawHub skills 并检查冲突

SKILLS=("capability-evolver" "wacli" "byterover" "self-improving-agent" "atxp" "agent-browser" "summarize" "github")
WORKDIR="/root/.openclaw/workspace/skills"
LOGFILE="/root/.openclaw/workspace/skills/install.log"

mkdir -p "$WORKDIR"
cd "$WORKDIR"

echo "=== ClawHub Skills 安装脚本 ===" | tee "$LOGFILE"
echo "开始时间: $(date)" | tee -a "$LOGFILE"
echo "" | tee -a "$LOGFILE"

for skill in "${SKILLS[@]}"; do
    echo "[$skill] 开始安装..." | tee -a "$LOGFILE"
    
    # 使用 timeout 命令限制每个安装最多 5 分钟
    if timeout 300 clawhub install "$skill" --force 2>&1 | tee -a "$LOGFILE"; then
        echo "[$skill] ✓ 安装成功" | tee -a "$LOGFILE"
        
        # 检查 skill 结构
        if [ -d "$skill" ]; then
            echo "[$skill] 目录结构:" | tee -a "$LOGFILE"
            ls -la "$skill/" | head -20 | tee -a "$LOGFILE"
            
            # 检查 SKILL.md
            if [ -f "$skill/SKILL.md" ]; then
                echo "[$skill] SKILL.md 存在" | tee -a "$LOGFILE"
                # 提取 metadata
                grep -A 20 "^---" "$skill/SKILL.md" | head -25 | tee -a "$LOGFILE"
            fi
        fi
    else
        echo "[$skill] ✗ 安装失败或超时" | tee -a "$LOGFILE"
    fi
    
    echo "" | tee -a "$LOGFILE"
    echo "等待 30 秒以避免速率限制..." | tee -a "$LOGFILE"
    sleep 30  # 避免速率限制
done

echo "" | tee -a "$LOGFILE"
echo "=== 安装完成 ===" | tee -a "$LOGFILE"
echo "结束时间: $(date)" | tee -a "$LOGFILE"
echo "" | tee -a "$LOGFILE"

# 检查已安装的技能
echo "已安装的技能:" | tee -a "$LOGFILE"
clawhub list 2>&1 | tee -a "$LOGFILE"
echo "" | tee -a "$LOGFILE"

# 检查潜在冲突
echo "=== 冲突检查 ===" | tee -a "$LOGFILE"
echo "检查重复的 metadata.name..." | tee -a "$LOGFILE"

for skill_dir in */; do
    if [ -f "$skill_dir/SKILL.md" ]; then
        name=$(grep "^name:" "$skill_dir/SKILL.md" 2>/dev/null | head -1)
        echo "[$skill_dir] $name" | tee -a "$LOGFILE"
    fi
done

echo "" | tee -a "$LOGFILE"
echo "检查 requires.bins 冲突..." | tee -a "$LOGFILE"

for skill_dir in */; do
    if [ -f "$skill_dir/SKILL.md" ]; then
        bins=$(grep -A 10 "requires:" "$skill_dir/SKILL.md" 2>/dev/null | grep "bins:" | head -1)
        if [ ! -z "$bins" ]; then
            echo "[$skill_dir] $bins" | tee -a "$LOGFILE"
        fi
    fi
done
