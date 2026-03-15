# ClawHub Skills 冲突分析报告

## 尝试安装的技能列表

| 技能名称 | 类别 | 核心功能 | 下载量 |
|---------|------|---------|--------|
| capability-evolver | AI/ML | AI 自我进化引擎，分析运行时历史并自动生成新技能 | 35,581+ |
| wacli | Utility | WhatsApp CLI 集成 | 16,415+ |
| byterover | Utility | 项目管理知识 CLI 工具 (brv) | 16,004+ |
| self-improving-agent | AI/ML | 模块化自进化框架 | 15,962+ |
| atxp | Utility | 高级系统级工具 | 14,453+ |
| agent-browser | Web | Web 自动化 | 11,836+ |
| summarize | Productivity | 文本摘要 | 10,956+ |
| github | Development | GitHub 集成 | 10,611+ |

---

## 潜在冲突分析

### 🔴 高风险冲突

#### 1. capability-evolver vs self-improving-agent
**冲突类型**: 功能重叠 + 文件修改竞争

| 维度 | capability-evolver | self-improving-agent |
|------|-------------------|---------------------|
| 核心机制 | 分析对话记录，自动生成新技能填补能力缺口 | 模块化自进化，针对性优化薄弱能力 |
| 修改目标 | `skills/` 目录、memory 文件 | Agent 能力模块 |
| 触发方式 | `/evolve` 命令或自动循环 | 交互式学习和优化 |
| 风险点 | 两者都可能修改 agent 的核心行为和 memory 文件 |

**建议**: 
- 二选一安装，不要同时启用
- 如需同时使用，建议 capability-evolver 用于技能生成，self-improving-agent 用于能力模块优化
- 确保使用 `--review` 模式进行人工确认

### 🟡 中等风险冲突

#### 2. byterover vs 其他 CLI 工具
**冲突类型**: 二进制依赖 + 环境变量

- byterover 依赖 `brv` CLI 工具
- 如果 atxp 或 wacli 也使用类似的命令行工具，可能存在 PATH 冲突
- byterover 使用 `.brv` 目录存储上下文树

#### 3. agent-browser vs 系统资源
**冲突类型**: 浏览器资源竞争

- agent-browser 可能使用 Playwright/Puppeteer 控制浏览器
- 如果系统中已有其他浏览器自动化工具，可能存在端口或进程冲突

### 🟢 低风险/无冲突

#### 4. summarize
- 纯文本处理技能，独立运行
- 无外部依赖冲突

#### 5. github
- 标准 GitHub API 集成
- 主要操作远程仓库
- 与本地技能无直接冲突

#### 6. wacli
- WhatsApp 集成，独立功能
- 无其他技能重叠

#### 7. atxp
- 通用工具集
- 需要查看具体实现才能确定冲突

---

## 安装建议

### 方案 A: 安全组合（推荐）
```bash
# AI 进化类 - 只选一个
capability-evolver  # 或 self-improving-agent，二选一

# 工具类
wacli
summarize
github
agent-browser

# 暂时不装 atxp 和 byterover，观察是否有冲突
```

### 方案 B: 全部安装但控制启用
```bash
# 安装所有技能
clawhub install capability-evolver wacli byterover self-improving-agent atxp agent-browser summarize github

# 配置策略:
# 1. 在 capability-evolver 中禁用 self-modify 模式
export EVOLVE_ALLOW_SELF_MODIFY=false

# 2. 为 self-improving-agent 设置不同的工作目录
# 3. 使用 --review 模式运行进化类技能
```

### 方案 C: 功能分层
```bash
# Layer 1: 基础工具层
clawhub install summarize github wacli

# Layer 2: 自动化层（测试后添加）
clawhub install agent-browser

# Layer 3: 进化层（谨慎使用，二选一）
clawhub install capability-evolver  # 或 self-improving-agent
```

---

## 环境变量检查清单

安装后需要检查的环境变量冲突：

```bash
# capability-evolver
EVOLVE_ALLOW_SELF_MODIFY  # 是否允许自我修改
evolve_LOAD_MAX            # 负载限制
EVOLVE_STRATEGY            # 进化策略

# byterover
A2A_NODE_ID                # EvoMap 网络节点 ID
A2A_HUB_URL                # EvoMap Hub URL

# github
GITHUB_TOKEN               # GitHub API Token

# 检查是否有重复的环境变量名
grep -r "^[A-Z_]*=" ~/.openclaw/skills/*/ 2>/dev/null | sort
```

---

## 文件系统冲突检查

```bash
# 检查各技能是否使用相同的目录
ls -la ~/.openclaw/skills/*/ 2>/dev/null

# 检查 common 目录冲突
# - skills/capability-evolver/assets/gep/
# - skills/byterover/.brv/
# - skills/*/memory/
```

---

## 总结

1. **最大风险**: capability-evolver 和 self-improving-agent 的功能重叠
2. **建议做法**: 
   - 先安装非 AI 进化类技能（summarize, github, wacli）
   - 测试稳定后再添加 agent-browser
   - 最后选择一种 AI 进化方案（推荐 capability-evolver，因为下载量更高且社区更活跃）
3. **监控要点**: 关注 `skills/` 目录的自动修改，定期备份重要配置

---

*报告生成时间: 2026-03-10*
*ClawHub 状态: 安装因服务器超时/速率限制未完成*
