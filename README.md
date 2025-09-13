# 前端开发规范提示词

## 三段式类名结构 核心约束要求

**格式：`节点-模块-描述名`**

**目的：由前两段配合实现就是为了确定出现的位置，第三段确定实现的功能和描述，这是重点。**

在进行前端开发时，必须严格遵循以下HTML类名和CSS选择器规范：

### 1. HTML类名命名规范（三段式结构）

**格式：`节点-模块-描述名`**

#### 第一段：节点名
- **文件级节点**：使用文件名作为前缀（如：`homepage`、`about`、`product`）
- **布局级节点**：仅支持 以下节点
  - `header`（头部区域）
  - `footer`（底部区域）
  - `sidebar`（侧边栏区域）
  - `main-container`（主内容区域）
  - `topnav`（顶部导航）

#### 第二段：模块名
- **功能模块名**：如 `banner`、`navlink`、`features`、`gallery`、`library`
- **继承模块名**：可以使用父节点的第三段作为模块名（如父节点 `header-nav-link`，子节点可用 `header-link-icon`）
- **特殊规则**：在主内容区域（main-container）内，可以直接用模块名作为第一段，**一旦确定模块名，该模块内所有子元素都必须以此模块名作为第一段**

#### 第三段：描述名
- **功能描述**：如 `title`、`image`、`link`、`button`、`icon`、`text`
- **状态描述**：如 `active`、`disabled`、`current`
- **核心作用**：明确该元素的具体功能和用途

### 2. CSS选择器编写规范

#### 基础选择器规则

**单一类选择器约束：**
- **单一类选择器**：`.类名 {}`（需要全局使用的样式规范 如.green类名设置绿色 ）
- **三段式类名**：`.节点-模块-描述 {}`（标准格式 类名必须符合三段式）
- **两段式类名**：`.节点-模块 {}`（简化格式 两段式 表示是个容器- 用于包裹子元素）

**父子关系选择器：**
- `.多段父类名 .子类名 {}`（子类名必须符合命名规范或为描述名）
- `.多段父类名 标签名 {}`（推荐用于语义化标签）

**类名段数使用场景：**
- **三段式**：常规使用，明确位置和功能
- **两段式**：模块级别或简化场景 容器，用于包裹子元素
- **单段描述名**：仅在避免四段、五段类名时使用，必须配合父选择器

**禁止使用的选择器：**
- 不使用 .多段父类名 .多段子类名{} 选择器 应用样式
- 不使用孤立的标签选择器（除reset样式外）
- 不使用四段、五段等过长类名
- 不使用复杂的多层嵌套（超过3层）

#### 深层嵌套处理规则
当DOM结构层级过深，避免产生四段、五段类名时，有三种处理方式：

**方式一：父类名 + 单段描述名**
- **HTML端**：使用单一描述性类名（如 `icon`、`text`、`item`、`title`）
- **CSS端**：`.父级类名 .描述名 {}`
- **示例**：`.footer-link-description .icon {}`

**方式二：父类名 + 标签名**
- **HTML端**：直接使用语义化的HTML标签
- **CSS端**：`.父级类名 标签名 {}`
- **示例**：`.header-nav-link span {}`、`.features-section-grid div {}`

**方式三：两段式类名**
- **HTML端**：简化为两段式类名
- **CSS端**：`.两段类名 {}`
- **示例**：`.nero-item {}`、`.cardlink-title {}`

### 3. 命名规范的核心价值

通过三段式命名实现：
- **位置明确**：`homepage-header-nav` → 在首页的头部区域的导航
- **功能清晰**：`header-nav-link` → 导航中的链接功能
- **层级清楚**：`features-card-icon` → features模块卡片中的图标
- **维护便利**：修改样式时能快速定位到对应功能模块

### 4. 实际应用示例

```html
<!-- 文件：homepage.html -->
<div class="homepage-header">
    <div class="homepage-header-logo">
        <span class="header-logo-text">网站名称</span>
    </div>
    <nav class="homepage-header-nav">
        <a href="#" class="header-nav-link">
            <i class="header-link-icon"></i>
            <span class="header-link-text">首页</span>
        </a>
        <div class="header-nav-item">
            <i class="icon"></i>
            <span class="header-item-text">关于我们</span>
        </div>
    </nav>
</div>

<main class="homepage-main-container">
    <!-- banner模块：所有子元素都以banner开头 -->
    <section class="banner-section">
        <div class="banner-section-content">
            <h1 class="banner-content-title">标题</h1>
        </div>
    </section>
    
    <!-- features模块：所有子元素都以features开头 -->
    <section class="features-section">
        <div class="features-section-grid">
            <div class="features-grid-item">
                <div class="features-item-card">
                    <i class="features-card-icon">star</i>
                    <h3 class="title">特色功能</h3>
                    <p class="features-title-desc">功能描述文本</p>
                </div>
            </div>
        </div>
    </section>
</main>
```

```css
/* 对应CSS样式 */
.homepage-header {
    /* 头部样式 */
}

.homepage-header-logo {
    /* logo区域样式 */
}

.header-logo-text {
    /* logo文字样式 */
}

/* 三段式标准类名 */
.homepage-header-nav {
    /* 导航区域样式 */
}

.header-nav-link {
    /* 导航链接样式（三段式） */
}

/* 继承模块名的正确使用 */
.header-link-icon {
    /* 链接图标样式 - link来自父节点第三段 */
    font-size: 18px;
}

.header-link-text {
    /* 链接文字样式 - link来自父节点第三段 */
    margin-left: 8px;
}

.header-nav-item .icon {
    /* 导航项图标样式 - item来自父节点第三段 */
    font-size: 16px;
}

.header-item-text {
    /* 导航项文字样式 - item来自父节点第三段 */
    margin-left: 10px;
}

/* banner模块的所有样式 */
.banner-section {
    /* banner区域样式 */
}

.banner-section-content {
    /* banner内容容器 */
}

.banner-content-title {
    /* banner标题样式 - content来自父节点第三段 */
    font-size: 2em;
}

/* features模块的所有样式 */
.features-section {
    /* features区域样式 */
}

.features-section-grid {
    /* features网格布局 */
}

.features-grid-item {
    /* features网格项 - grid来自父节点第三段 */
}

.features-item-card {
    /* features卡片 - item来自父节点第三段 */
}

.features-card-icon {
    /* features图标 - card来自父节点第三段 */
    font-size: 24px;
    color: #007bff;
}

.features-item-card .title {
    /* features标题 - card来自父节点第三段 */
    font-size: 1.2em;
    margin: 10px 0;
}

.features-title-desc {
    /* features描述 - title来自父节点第三段 */
    color: #666;
}
```

## 开发约束指令

**核心重点**：类名的目的是由前两段配合实现位置确定，第三段确定实现的功能和描述。

请在编写前端代码时严格遵循：

1. **HTML标签的class属性必须使用规定的段数格式**
2. **前两段必须明确元素的位置信息**
3. **第三段必须明确元素的功能描述**
4. **CSS单一选择器只能使用三段式、两段式或单段描述名(用于全局样式初始化)**
5. **单段描述名仅在避免四段五段类名时使用**
6. **CSS选择器支持三种嵌套处理方式**
7. **严禁使用四段、五段等过长类名**
8. **保持HTML类名和CSS选择器的一致性**
9. **禁止使用内联样式和ID选择器**
10. **确保类名语义化且结构清晰**

## 检查清单

开发完成后请检查：
- [ ] 所有HTML class属性符合段数规则（三段式/两段式/单段描述名）
- [ ] CSS单一选择器严格遵循段数约束
- [ ] 单段描述名仅在必要时使用（避免四段五段类名）
- [ ] CSS选择器使用正确的嵌套处理方式
- [ ] 没有出现四段、五段等过长类名
- [ ] 深层嵌套正确使用父子选择器
- [ ] 类名与CSS选择器完全对应
- [ ] 代码结构清晰，便于维护

---

**重要提醒**：此规范旨在提高代码可维护性和团队协作效率，请严格执行，不得随意偏离。
