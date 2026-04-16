# 苏州Housing - 日本人租房服务网站

面向日本客户的苏州房产租赁网站，支持中日英三语言。

## 功能特性

### 核心功能
- **多语言支持**：日语、中文、英文三语言切换
- **房源展示**：高端公寓、普通住宅、别墅展示
- **智能筛选**：按区域、价格、房型、朝向等筛选
- **图片画廊**：房源多图展示
- **配套设施**：展示WiFi、停车场、健身房等设施
- **服务介绍**：搬家、生活指引、翻译、看房陪同等服务
- **在线咨询**：联系表单和联系方式

### SEO优化
- 针对日本搜索引擎优化
- 多语言meta标签
- Open Graph社交分享支持
- 结构化数据

## 快速开始

### 环境要求
- Node.js 18+
- pnpm (已预装)

### 安装依赖

```bash
cd /workspace/projects
pnpm install
```

### 开发模式

```bash
pnpm dev
```

访问 http://localhost:5000

### 构建生产版本

```bash
pnpm build
pnpm start
```

## 项目结构

```
src/
├── app/
│   ├── [locale]/           # 多语言路由
│   │   ├── page.tsx        # 首页
│   │   ├── properties/     # 房源相关
│   │   │   ├── page.tsx    # 房源列表
│   │   │   └── [id]/       # 房源详情
│   │   ├── services/       # 服务页面
│   │   ├── about/          # 关于我们
│   │   └── contact/        # 联系方式
│   ├── layout.tsx          # 根布局
│   └── globals.css         # 全局样式
├── components/
│   ├── Navigation.tsx      # 导航栏
│   ├── Footer.tsx          # 页脚
│   ├── PropertyCard.tsx    # 房源卡片
│   └── ui/                # UI组件库
├── contexts/
│   └── LocaleContext.tsx   # 多语言上下文
├── data/
│   └── properties.ts       # 示例房源数据
├── hooks/
│   └── use-toast.ts       # Toast提示
└── lib/
    └── utils.ts           # 工具函数
```

## 页面说明

### 首页 (`/`)
- 搜索栏和快速筛选
- 精选房源展示
- 服务介绍
- 公司优势
- CTA联系区

### 房源列表 (`/ja/properties`)
- 左侧筛选栏（区域、类型、价格、卧室数、朝向）
- 房源卡片网格展示
- 响应式设计

### 房源详情 (`/ja/properties/[id]`)
- 图片画廊（支持切换）
- 房源信息（价格、面积、楼层等）
- 设施列表
- 在线咨询表单
- 联系方式

### 服务页面 (`/ja/services`)
- 搬家服务
- 生活支持
- 翻译口译
- 看房陪同

### 关于我们 (`/ja/about`)
- 公司介绍
- 服务理念
- 核心价值观

### 联系方式 (`/ja/contact`)
- 联系表单
- 电话、邮箱、地址
- WeChat二维码

## 数据管理

### 示例数据
房源数据存储在 `src/data/properties.ts`

```typescript
export interface Property {
  id: string;
  title: Record<string, string>;  // ja, zh, en
  description: Record<string, string>;
  price: number;
  currency: 'CNY' | 'JPY';
  size: number;           // 面积(㎡)
  bedrooms: number;
  bathrooms: number;
  floor: number;
  totalFloors: number;
  direction: string;      // south, north, east, west...
  area: string;          // sip, gusu, wuzhong...
  type: 'apartment' | 'house' | 'villa';
  facilities: string[];  // wifi, parking, gym...
  images: string[];
  featured?: boolean;
}
```

### 添加新房源
在 `properties.ts` 中添加新的Property对象即可。

### 扩展设施类型
在 `facilityLabels` 对象中添加新的翻译。

## 多语言

### 切换语言
- 导航栏右上角语言选择器
- 语言设置保存在localStorage

### 添加新语言
1. 在 `LocaleContext.tsx` 的 `translations` 对象中添加新语言
2. 在 `languages` 数组中添加语言选项

```typescript
const translations: Record<Locale, Record<string, string>> = {
  ja: { /* 日语翻译 */ },
  zh: { /* 中文翻译 */ },
  en: { /* 英语翻译 */ },
  // 添加新语言
  ko: { /* 韩语翻译 */ },
};
```

## 数据库集成（可选）

如需使用真实数据库，可通过Supabase集成：

1. 创建Supabase项目
2. 在 `.env` 中配置数据库连接
3. 实现CRUD API

详见 Supabase Skill 集成文档。

## 部署

### 香港节点部署
项目配置已针对香港节点优化。

1. 构建项目：`pnpm build`
2. 部署到服务器
3. 配置环境变量

### 环境变量
```env
DATABASE_URL=your_database_url
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## 常用命令

```bash
# 安装依赖
pnpm install

# 开发
pnpm dev

# 构建
pnpm build

# 生产
pnpm start

# 代码检查
pnpm lint
```

## 技术栈

- **框架**: Next.js 16 (App Router)
- **语言**: TypeScript 5
- **UI组件**: shadcn/ui
- **样式**: Tailwind CSS 4
- **图标**: Lucide React

## 联系方式

- 网站: https://suzhouhousing.jp
- 邮箱: info@suzhouhousing.jp
- 电话: +86 512-XXXX-XXXX
