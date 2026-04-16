# 苏州Housing 网站搭建教程

## 目录
1. [项目概述](#项目概述)
2. [快速开始](#快速开始)
3. [开发环境设置](#开发环境设置)
4. [项目结构详解](#项目结构详解)
5. [核心功能实现](#核心功能实现)
6. [多语言系统](#多语言系统)
7. [房源管理](#房源管理)
8. [SEO优化](#seo优化)
9. [部署上线](#部署上线)
10. [日常维护](#日常维护)

---

## 项目概述

### 目标用户
- 在苏州工作的日本人
- 在日本但想来苏州租房的日本人

### 核心功能
- 多语言网站（日语、中文、英文）
- 房源展示与搜索
- 在线咨询服务
- 搬家、生活指南等配套服务

---

## 快速开始

### 步骤1：安装依赖
```bash
cd /workspace/projects
pnpm install
```

### 步骤2：启动开发服务器
```bash
pnpm dev
```

### 步骤3：访问网站
打开浏览器访问：http://localhost:5000

---

## 开发环境设置

### 必要工具
- Node.js 18+
- pnpm（包管理器）
- VS Code（推荐编辑器）

### VS Code推荐插件
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin (Volar)

### 开发命令
```bash
# 开发模式（热更新）
pnpm dev

# 代码检查
pnpm lint

# 类型检查
pnpm ts-check

# 构建生产版本
pnpm build

# 生产模式运行
pnpm start
```

---

## 项目结构详解

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/          # 动态路由参数（ja, zh, en）
│   │   ├── page.tsx       # 首页
│   │   ├── layout.tsx     # 布局组件
│   │   ├── properties/    # 房源模块
│   │   │   ├── page.tsx   # 房源列表
│   │   │   └── [id]/      # 动态路由（房源ID）
│   │   │       └── page.tsx
│   │   ├── services/      # 服务页面
│   │   ├── about/         # 关于我们
│   │   └── contact/        # 联系方式
│   ├── layout.tsx         # 根布局
│   └── globals.css        # 全局样式
├── components/
│   ├── Navigation.tsx     # 顶部导航
│   ├── Footer.tsx         # 页脚
│   ├── PropertyCard.tsx   # 房源卡片组件
│   └── ui/                # shadcn/ui组件库
├── contexts/
│   └── LocaleContext.tsx  # 多语言上下文
├── data/
│   └── properties.ts      # 房源数据
└── lib/
    └── utils.ts           # 工具函数
```

---

## 核心功能实现

### 1. 多语言首页

**文件**: `src/app/[locale]/page.tsx`

```typescript
export default function HomePage() {
  const { locale, t } = useLocale();
  
  return (
    <div>
      <h1>{t('hero.title')}</h1>
    </div>
  );
}
```

### 2. 房源卡片组件

**文件**: `src/components/PropertyCard.tsx`

房源卡片展示：
- 封面图片
- 价格
- 标题（多语言）
- 位置
- 基本信息（面积、卧室、卫生间）

### 3. 筛选功能

**文件**: `src/app/[locale]/properties/page.tsx`

支持的筛选条件：
- 区域（苏州各区）
- 房屋类型（公寓、住宅、别墅）
- 价格范围
- 卧室数量
- 朝向

---

## 多语言系统

### 语言切换器

**文件**: `src/contexts/LocaleContext.tsx`

翻译数据存储格式：
```typescript
const translations: Record<Locale, Record<string, string>> = {
  ja: {
    'nav.home': 'ホーム',
    'hero.title': '蘇州で理想のお部屋を見つけよう',
    // ...
  },
  zh: {
    'nav.home': '首页',
    'hero.title': '在苏州找到您的理想之家',
    // ...
  },
};
```

### 添加新翻译

1. 找到翻译文件
2. 添加新的key-value对
3. 在组件中使用 `t('key')`

### 使用翻译

```typescript
import { useLocale } from '@/contexts/LocaleContext';

function MyComponent() {
  const { t } = useLocale();
  return <h1>{t('hero.title')}</h1>;
}
```

---

## 房源管理

### 添加新房源

编辑 `src/data/properties.ts`：

```typescript
export const sampleProperties: Property[] = [
  // 现有房源...
  {
    id: 'new-id',
    title: {
      ja: '日本語タイトル',
      zh: '中文标题',
      en: 'English Title',
    },
    price: 15000,
    // ... 其他字段
  },
];
```

### 房源字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| id | string | 唯一标识 |
| title | Record | 多语言标题 |
| price | number | 价格 |
| size | number | 面积(㎡) |
| bedrooms | number | 卧室数 |
| bathrooms | number | 卫生间数 |
| floor | number | 所在楼层 |
| direction | string | 朝向 |
| area | string | 区域 |
| type | string | 房屋类型 |
| facilities | string[] | 设施列表 |
| images | string[] | 图片URL |

---

## SEO优化

### Meta标签配置

**文件**: `src/app/layout.tsx`

```typescript
export const metadata: Metadata = {
  title: {
    default: 'Suzhou Housing',
    ja: '苏州Housing',
    zh: '苏州租房',
  },
  description: {
    ja: '苏州专业的日本人租房服务...',
    // ...
  },
};
```

### Open Graph配置

支持社交平台分享优化：
- Facebook
- Twitter
- LINE

### 国际化SEO

每个语言版本有独立的meta标签和URL。

---

## 部署上线

### 部署前检查清单

- [ ] 所有翻译已完成
- [ ] 测试所有页面
- [ ] 图片已上传
- [ ] 环境变量已配置
- [ ] 数据库连接正常

### 部署命令

```bash
# 构建
pnpm build

# 本地测试
pnpm start
```

### 香港节点部署

项目已配置香港节点环境变量，上传代码后自动部署。

---

## 日常维护

### 添加新房源
1. 编辑 `src/data/properties.ts`
2. 添加房源数据
3. 提交代码

### 更新翻译
1. 编辑 `src/contexts/LocaleContext.tsx`
2. 添加/修改翻译
3. 测试显示效果

### 添加新功能
1. 创建组件
2. 在页面中引入
3. 测试功能
4. 提交代码

---

## 常见问题

### Q: 如何添加新的房屋类型？
A: 在 `PropertyCard.tsx` 的 `typeColors` 对象中添加。

### Q: 如何修改筛选选项？
A: 编辑 `src/app/[locale]/properties/page.tsx` 中的筛选逻辑。

### Q: 如何添加新的服务？
A: 在 `src/app/[locale]/services/page.tsx` 中添加服务卡片。

### Q: 图片上传在哪里配置？
A: 当前使用Unsplash图片URL，生产环境建议使用对象存储。

---

## 技术支持

- 文档：查看项目README
- 问题：联系技术支持团队

---

*最后更新：2024年*
