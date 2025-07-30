# 🤖 AI 智能助手服务

一个基于 Next.js 15 和 TypeScript 构建的现代化 AI 服务网站，提供智能对话和图像生成功能，使用智谱 AI API 接口。

## ✨ 功能特性

### 🎯 核心功能

### 💬 智能对话
- **实时对话** - 与AI助手进行自然语言交流
- **多领域知识** - 支持问答、建议、问题解决
- **上下文记忆** - 保持对话连贯性
- **友好界面** - 类似聊天软件的交互体验

### 🎨 图像生成
- **文本生成图像** - 通过描述创建高质量图片
- **多种尺寸** - 支持1024x1024等不同尺寸
- **一键下载** - 生成的图像可直接保存
- **历史记录** - 查看和管理生成的图像

### 📄 文档处理
- **智能摘要** - 快速提炼文档核心内容
- **多语言翻译** - 支持多种语言互译
- **文档问答** - 基于文档内容智能回答问题
- **格式保持** - 保持原文档结构和逻辑

### 💻 代码助手
- **代码生成** - 根据需求生成完整代码实现
- **代码解释** - 详细解释代码功能和原理
- **代码优化** - 提供性能和可读性优化建议
- **多语言支持** - JavaScript、Python、Java、C++、Go、Rust等

### ✍️ 文本处理
- **文本摘要** - 提炼长文本的核心要点
- **文本润色** - 提升文本表达质量和专业性
- **情感分析** - 分析文本的情感倾向和态度
- **关键词提取** - 提取文本的核心概念和关键词

### 🎭 创意写作
- **诗歌创作** - 创作各种风格的诗歌作品
- **故事写作** - 创作引人入胜的故事情节
- **营销文案** - 撰写吸引人的营销内容
- **头脑风暴** - 提供创意想法和解决方案

### 🛠️ 实用工具
- **邮件撰写** - 生成各种类型的邮件模板
- **会议纪要** - 自动整理会议记录和要点
- **学习助手** - 提供个性化学习建议和方法
- **健康建议** - 提供一般性健康生活指导

### 🛠️ 技术实现
- **⚡ Next.js 15** - 现代化 React 框架，使用 App Router
- **📘 TypeScript 5** - 类型安全的 JavaScript 开发
- **🎨 Tailwind CSS 4** - 实用优先的 CSS 框架
- **🧩 shadcn/ui** - 高质量的 UI 组件库
- **🤖 z-ai-web-dev-sdk** - 智谱 AI API 集成

## 🚀 快速开始

### 环境要求
- Node.js 18+ 
- npm 或 yarn

### 安装和运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用程序。

### 可用脚本

```bash
npm run dev          # 启动开发服务器
npm run build        # 构建生产版本
npm run start        # 启动生产服务器
npm run lint         # 运行代码质量检查
npm run db:push      # 推送数据库 schema
npm run db:generate  # 生成 Prisma 客户端
```

## 📁 项目结构

```
src/
├── app/                    # Next.js App Router 页面
│   ├── api/               # API 路由
│   │   ├── chat/          # AI 对话 API
│   │   ├── generate-image/ # 图像生成 API
│   │   └── health/        # 健康检查 API
│   ├── page.tsx           # 主页面
│   └── layout.tsx         # 根布局
├── components/            # React 组件
│   └── ui/               # shadcn/ui 组件
├── hooks/                # 自定义 React hooks
└── lib/                  # 工具函数和配置
```

## 🎯 使用指南

### 💬 智能对话功能
1. 在主页选择"智能对话"选项卡
2. 在输入框中输入您的问题或需求
3. 点击发送按钮或按 Enter 键
4. AI助手会实时回复您的问题
5. 支持多轮对话，保持上下文连贯性

### 🎨 图像生成功能
1. 在主页选择"图像生成"选项卡
2. 在文本框中详细描述您想要生成的图像
3. 点击"生成图像"按钮
4. 等待AI处理并生成图像
5. 点击生成的图像可以下载保存

### 📄 文档处理功能
1. 在主页选择"文档处理"选项卡
2. 选择处理类型：摘要、翻译或问答
3. 输入要处理的文档内容
4. 点击"处理文档"按钮
5. 查看处理结果和历史记录

### 💻 代码助手功能
1. 在主页选择"代码助手"选项卡
2. 选择处理类型：生成、解释或优化
3. 选择编程语言
4. 输入代码需求或代码内容
5. 点击"处理代码"按钮
6. 查看AI生成的代码或建议

### ✍️ 文本处理功能
1. 在主页选择"文本处理"选项卡
2. 选择处理类型：摘要、润色、情感分析或关键词提取
3. 输入要处理的文本内容
4. 点击"处理文本"按钮
5. 查看处理结果和分析

### 🎭 创意写作功能
1. 在主页选择"创意写作"选项卡
2. 选择创作类型：诗歌、故事、营销文案或头脑风暴
3. 输入创作主题或关键词
4. 点击"生成内容"按钮
5. 查看AI创作的创意内容

### 🛠️ 实用工具功能
1. 在主页选择"实用工具"选项卡
2. 选择工具类型：邮件、会议纪要、学习助手或健康建议
3. 输入您的需求或描述
4. 点击"生成建议"按钮
5. 查看AI提供的实用建议

### API 接口

#### 💬 AI 对话 API
```
POST /api/chat
Content-Type: application/json

{
  "message": "您好，请介绍一下自己"
}
```

#### 🎨 图像生成 API
```
POST /api/generate-image
Content-Type: application/json

{
  "prompt": "一只可爱的小猫在花园里玩耍"
}
```

#### 📄 文档处理 API
```
POST /api/document-processing
Content-Type: application/json

{
  "type": "summary",
  "content": "要处理的文档内容..."
}
```

#### 💻 代码助手 API
```
POST /api/code-assistant
Content-Type: application/json

{
  "type": "generate",
  "language": "javascript",
  "code": "实现一个快速排序算法"
}
```

#### ✍️ 文本处理 API
```
POST /api/text-processing
Content-Type: application/json

{
  "type": "summary",
  "content": "要处理的文本内容..."
}
```

#### 🎭 创意写作 API
```
POST /api/creative-writing
Content-Type: application/json

{
  "type": "poem",
  "topic": "春天的美景"
}
```

#### 🛠️ 实用工具 API
```
POST /api/utility-tools
Content-Type: application/json

{
  "type": "email",
  "input": "需要写一封求职邮件..."
}
```

## 🛠️ 技术栈详情

### 前端技术
- **Next.js 15** - React 全栈框架
- **TypeScript 5** - 类型安全的 JavaScript
- **Tailwind CSS 4** - 原子化 CSS 框架
- **shadcn/ui** - 基于 Radix UI 的组件库
- **Lucide React** - 现代化图标库
- **Framer Motion** - 动画库

### 后端技术
- **Next.js API Routes** - 服务端 API
- **z-ai-web-dev-sdk** - 智谱 AI 集成
- **Prisma** - 数据库 ORM
- **SQLite** - 轻量级数据库

### 开发工具
- **ESLint** - 代码质量检查
- **tsx** - TypeScript 执行器
- **nodemon** - 开发服务器热重载

## 🎨 UI/UX 特性

### 设计原则
- **移动优先** - 响应式设计，完美适配各种设备
- **无障碍访问** - 遵循 WCAG 标准
- **一致性** - 统一的设计语言和交互模式
- **性能优化** - 快速加载和流畅交互

### 交互特性
- **实时反馈** - 加载状态和错误提示
- **键盘导航** - 支持 Enter 键发送消息
- **触摸友好** - 适配移动设备触摸操作
- **动画效果** - 平滑的过渡和微交互

## 🚀 部署指南

### 云服务器部署
1. **准备服务器**
   - 推荐：阿里云、腾讯云、华为云等
   - 系统：Ubuntu 20.04+ 或 CentOS 7+
   - 配置：2核4GB 起步

2. **安装环境**
```bash
# 安装 Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 安装 PM2
npm install -g pm2
```

3. **部署项目**
```bash
# 克隆项目
git clone <your-repo-url>
cd ai-service-website

# 安装依赖
npm install

# 构建项目
npm run build

# 启动服务
pm2 start ecosystem.config.js
```

### Docker 部署
```bash
# 构建镜像
docker build -t ai-service .

# 运行容器
docker run -d -p 3000:3000 ai-service
```

### 环境变量配置
创建 `.env.local` 文件：
```env
# 数据库配置
DATABASE_URL="file:./dev.db"

# AI 服务配置（如果需要）
AI_API_KEY="your-api-key"
AI_API_BASE_URL="https://api.example.com"
```

## 🔧 开发指南

### 添加新功能
1. 在 `src/components/` 下创建新组件
2. 在 `src/app/` 下添加新页面或 API 路由
3. 使用 TypeScript 确保类型安全
4. 遵循现有的代码风格和结构

### 代码规范
- 使用 ESLint 进行代码检查
- 遵循 TypeScript 严格模式
- 使用 Prettier 格式化代码
- 编写清晰的注释和文档

### 测试
```bash
# 运行代码检查
npm run lint

# 运行类型检查
npx tsc --noEmit
```

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🆘 支持与反馈

如果您在使用过程中遇到问题或有改进建议，请：
- 创建 Issue 描述问题
- 发送邮件到 support@example.com
- 查看 [Wiki](wiki) 文档

---

**🤖 由智谱 AI 驱动，让 AI 服务触手可及！**
