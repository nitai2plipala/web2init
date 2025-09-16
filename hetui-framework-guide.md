# Hetui Framework 完整开发指南

## 框架简介

**Hetui Framework** 是一个轻量级的前端数据绑定框架，实现了完整的MVVM架构模式。

### 核心功能
- **响应式数据绑定** - 自动同步数据与DOM
- **声明式模板语法** - HTML属性指令系统
- **事件处理机制** - 鼠标、触摸、表单事件
- **列表渲染** - 动态生成重复DOM元素
- **条件渲染** - 根据数据控制元素显示
- **网络请求工具** - XHR和JSONP封装

## 1. 数据绑定系统

### 1.1 基础数据绑定

**功能实现**: 使用 `Object.defineProperty` 劫持数据访问，实现数据变更时自动更新DOM

**使用规范**:

```javascript
// 步骤1: 定义数据模型
const appData = {
    title: "Hetui示例应用",
    user: {
        name: "张三",
        email: "zhangsan@example.com",
        profile: {
            avatar: "/images/avatar.jpg",
            bio: "全栈开发工程师"
        }
    },
    settings: {
        theme: "dark",
        notifications: true
    }
};

// 步骤2: 创建响应式观察者
const observer = Hetui.Observe(appData);

// 步骤3: 数据变更将自动更新相关DOM
observer.user.name = "李四"; // DOM中所有绑定name的元素自动更新
```

### 1.2 文本绑定指令

**指令**: `:text`
**功能**: 将数据值绑定到元素的 `innerText` 属性

```html
<!-- 基础文本绑定 -->
<h1 :text="title" hetui="">默认标题</h1>

<!-- 嵌套对象属性绑定 -->
<span :text="user:name" hetui="">用户名</span>
<p :text="user:profile:bio" hetui="">个人简介</p>

<!-- 深层嵌套访问 -->
<div :text="settings:theme" hetui="">主题设置</div>
```

**实现原理**: 
- 解析属性值中的路径（用冒号分隔）
- 订阅对应数据变化
- 数据更新时执行回调函数更新DOM

### 1.3 属性绑定指令

**指令**: `:attr`
**功能**: 动态绑定HTML元素属性

```html
<!-- 图片源绑定 -->
<img :attr="src|user:profile:avatar" alt="用户头像" hetui="">

<!-- 链接地址绑定 -->
<a :attr="href|user:email" hetui="">联系邮箱</a>

<!-- 自定义属性绑定 -->
<div :attr="data-theme|settings:theme" hetui="">主题容器</div>

<!-- 多属性绑定 -->
<input :attr="placeholder|user:name" :attr="value|user:email" hetui="">
```

**语法规范**: `属性名|数据路径`

### 1.4 表单值绑定

**指令**: `:value`, `:value|name`
**功能**: 双向绑定表单控件值

```html
<!-- 单向值绑定 -->
<input type="text" :value="user:name" hetui="">

<!-- 双向绑定（设置name属性） -->
<input type="email" :value="user:email" :value|name="user:email" hetui="">

<!-- 表单控件绑定 -->
<select :value="settings:theme" hetui="">
    <option value="light">浅色主题</option>
    <option value="dark">深色主题</option>
</select>

<textarea :value="user:profile:bio" hetui=""></textarea>
```

## 2. 事件处理系统

### 2.1 鼠标事件处理

**支持的事件**: `@click`, `@upmouse`, `@downmouse`, `@movemouse`, `@entermouse`

**实现机制**: 绑定原生DOM事件，调用指定的控制器方法

```html
<!-- 点击事件 -->
<button @click="User:Login" hetui="">登录</button>
<button @click="App:ToggleTheme" hetui="">切换主题</button>

<!-- 鼠标交互事件 -->
<div @upmouse="Mouse:HandleUp" @downmouse="Mouse:HandleDown" hetui="">
    拖拽区域
</div>

<div @entermouse="UI:ShowTooltip" hetui="">悬停显示提示</div>
```

**控制器定义**:

```javascript
// 扩展Hetui控制器
Hetui.User = {
    Login: function(event, htm, observer) {
        // event: 原生事件对象
        // htm: Hetui包装的HTML节点对象
        // observer: 数据观察者对象
        
        console.log("登录按钮被点击");
        event.Bubble(false); // 阻止事件冒泡
        
        // 修改数据状态
        observer.user.isLoggedIn = true;
    }
};

Hetui.App = {
    ToggleTheme: function(event, htm, observer) {
        const current = observer.settings.theme;
        observer.settings.theme = current === 'dark' ? 'light' : 'dark';
    }
};
```

### 2.2 触摸事件处理

**支持的事件**: `@touchstart`, `@touchmove`, `@touchend`, `@touchenter`, `@touchleave`

```html
<!-- 基础触摸事件 -->
<div @touchstart="Touch:Start" @touchmove="Touch:Move" hetui="">
    触摸滑动区域
</div>

<!-- 被动事件监听（使用冒号后缀） -->
<div @touchstart:"Touch:StartPassive" @touchmove:"Touch:MovePassive" hetui="">
    被动触摸监听
</div>
```

**触摸控制器实现**:

```javascript
Hetui.Touch = {
    Start: function(event, htm, observer) {
        event.Bubble(false);
        
        // 记录触摸开始位置
        const touch = event.touches[0];
        observer.touch = {
            startX: touch.clientX,
            startY: touch.clientY,
            active: true
        };
    },
    
    Move: function(event, htm, observer) {
        if (!observer.touch.active) return;
        
        const touch = event.touches[0];
        observer.touch.currentX = touch.clientX;
        observer.touch.currentY = touch.clientY;
        
        // 计算移动距离
        const deltaX = touch.clientX - observer.touch.startX;
        const deltaY = touch.clientY - observer.touch.startY;
        
        observer.touch.deltaX = deltaX;
        observer.touch.deltaY = deltaY;
    },
    
    End: function(event, htm, observer) {
        observer.touch.active = false;
    }
};
```

### 2.3 内联函数事件

**指令**: `@click|functor`
**功能**: 直接在HTML中定义箭头函数处理事件

```html
<!-- 简单内联处理 -->
<button @click|functor="event => console.log('按钮被点击')" hetui="">
    测试按钮
</button>

<!-- 复杂内联逻辑 -->
<input @click|functor="event, htm, observer => {
    event.Bubble(false);
    observer.inputFocused = true;
    htm.Node.style.borderColor = '#007bff';
}" hetui="">

<!-- 数据操作 -->
<button @click|functor="event, htm, observer => {
    observer.counter = (observer.counter || 0) + 1;
}" hetui="">
    点击计数: <span :text="counter" hetui="">0</span>
</button>
```

### 2.4 表单提交处理

**指令**: `@submit`
**功能**: 处理表单提交，自动收集表单数据

```html
<form @submit="Form:HandleLogin" hetui="">
    <input type="text" name="username" placeholder="用户名" :value|name="form:username">
    <input type="password" name="password" placeholder="密码" :value|name="form:password">
    <input type="email" name="email" placeholder="邮箱" :value|name="form:email">
    <button type="submit">登录</button>
</form>
```

**表单控制器实现**:

```javascript
Hetui.Form = {
    HandleLogin: function(event, form, htm, observer) {
        // 阻止默认表单提交
        event.Bubble(false);
        
        // form 参数包含所有具有name属性的表单元素值
        console.log("表单数据:", form);
        // 输出: { username: "输入的用户名", password: "输入的密码", email: "输入的邮箱" }
        
        // 表单验证
        if (!form.username || !form.password) {
            alert("请填写用户名和密码");
            return;
        }
        
        // 提交数据到服务器
        Network.XHR({
            url: "/api/login",
            method: "POST",
            code: "json",
            data: form,
            option: {
                typeof: "json",
                success: function(response) {
                    if (response.success) {
                        observer.user = response.user;
                        observer.user.isLoggedIn = true;
                    } else {
                        alert("登录失败: " + response.message);
                    }
                }
            }
        });
    }
};
```

## 3. 列表渲染系统

### 3.1 基础列表渲染

**指令**: `foreach:`
**功能**: 根据数组数据动态生成DOM元素

```html
<!-- 简单列表渲染 -->
<ul>
    <li foreach:="items" hetui="">
        <span :text="#index" hetui="">序号</span>
        <span :text="name" hetui="">项目名称</span>
        <span :text="price" hetui="">价格</span>
    </li>
</ul>

<!-- 用户列表 -->
<div class="user-list">
    <div class="user-card" foreach:="users" hetui="">
        <img :attr="src|avatar" alt="头像" hetui="">
        <h3 :text="name" hetui="">用户名</h3>
        <p :text="email" hetui="">邮箱</p>
        <span class="user-id" :text="#index" hetui="">用户编号</span>
        <button @click="User:ViewProfile" hetui="">查看详情</button>
    </div>
</div>
```

**数据结构定义**:

```javascript
const listData = {
    items: [
        { name: "笔记本电脑", price: "5999" },
        { name: "无线鼠标", price: "199" },
        { name: "机械键盘", price: "599" }
    ],
    users: [
        { name: "张三", email: "zhangsan@example.com", avatar: "/images/user1.jpg" },
        { name: "李四", email: "lisi@example.com", avatar: "/images/user2.jpg" },
        { name: "王五", email: "wangwu@example.com", avatar: "/images/user3.jpg" }
    ]
};

const observer = Hetui.Observe(listData);

// 动态添加数据项，DOM会自动更新
observer.items.push({ name: "显示器", price: "1299" });

// 删除数据项
observer.items.splice(0, 1); // 删除第一项
```

### 3.2 嵌套列表渲染

```html
<!-- 分类商品列表 -->
<div foreach:="categories" hetui="">
    <h2 :text="name" hetui="">分类名称</h2>
    <div class="products">
        <div class="product-card" foreach:="products" hetui="">
            <img :attr="src|image" hetui="">
            <h3 :text="name" hetui="">商品名</h3>
            <p :text="description" hetui="">描述</p>
            <span :text="price" hetui="">价格</span>
        </div>
    </div>
</div>
```

**嵌套数据结构**:

```javascript
const nestedData = {
    categories: [
        {
            name: "电子产品",
            products: [
                { name: "iPhone", description: "苹果手机", price: "6999", image: "/images/iphone.jpg" },
                { name: "iPad", description: "苹果平板", price: "3999", image: "/images/ipad.jpg" }
            ]
        },
        {
            name: "服装",
            products: [
                { name: "T恤", description: "纯棉T恤", price: "99", image: "/images/tshirt.jpg" },
                { name: "牛仔裤", description: "经典牛仔裤", price: "299", image: "/images/jeans.jpg" }
            ]
        }
    ]
};
```

## 4. 条件渲染系统

### 4.1 条件显示控制

**指令**: `boolean|show`
**功能**: 根据布尔值控制元素显示/隐藏

```html
<!-- 基础条件显示 -->
<div boolean|show="user:isLoggedIn" hetui="">
    <h2>欢迎回来，<span :text="user:name" hetui=""></span>!</h2>
    <button @click="User:Logout" hetui="">退出登录</button>
</div>

<div boolean|show="user:isLoggedIn|false" hetui="">
    <h2>请先登录</h2>
    <button @click="UI:ShowLoginModal" hetui="">点击登录</button>
</div>

<!-- 权限控制显示 -->
<div boolean|show="user:permissions:admin" hetui="">
    <button @click="Admin:ManageUsers" hetui="">用户管理</button>
    <button @click="Admin:ViewAnalytics" hetui="">数据分析</button>
</div>
```

### 4.2 手动显示控制

**指令**: `#hide`
**功能**: 程序化控制元素显示隐藏

```html
<!-- 模态框控制 -->
<div class="modal" #hide="modalController" hetui="">
    <div class="modal-content">
        <h2>这是一个模态框</h2>
        <button @click="UI:CloseModal" hetui="">关闭</button>
    </div>
</div>

<!-- 提示信息控制 -->
<div class="alert" #hide="alertController" hetui="">
    <span :text="alertMessage" hetui="">提示信息</span>
    <button @click="UI:CloseAlert" hetui="">×</button>
</div>
```

**JavaScript控制**:

```javascript
Hetui.UI = {
    ShowLoginModal: function(event, htm, observer) {
        // modalController 是 #hide 指令创建的控制函数
        observer.modalController(false); // false表示显示
    },
    
    CloseModal: function(event, htm, observer) {
        observer.modalController(true); // true表示隐藏
    },
    
    ShowAlert: function(message, observer) {
        observer.alertMessage = message;
        observer.alertController(false); // 显示提示
        
        // 3秒后自动隐藏
        setTimeout(() => {
            observer.alertController(true);
        }, 3000);
    }
};
```

### 4.3 条件样式控制

**指令**: `boolean|class`
**功能**: 根据条件切换CSS类名

```html
<!-- 主题切换 -->
<div boolean|class="settings:isDarkMode ? dark-theme | light-theme" hetui="">
    <h1>主题示例</h1>
    <p>根据设置自动切换主题样式</p>
</div>

<!-- 状态样式 -->
<button boolean|class="form:isValid ? btn-primary | btn-disabled" hetui="">
    提交表单
</button>

<!-- 用户状态 -->
<div class="user-status" boolean|class="user:isOnline ? status-online | status-offline" hetui="">
    <span :text="user:name" hetui=""></span>
    <span boolean|class="user:isOnline ? online-indicator | offline-indicator" hetui=""></span>
</div>
```

**CSS样式定义**:

```css
.dark-theme {
    background-color: #333;
    color: #fff;
}

.light-theme {
    background-color: #fff;
    color: #333;
}

.btn-primary {
    background-color: #007bff;
    color: white;
    cursor: pointer;
}

.btn-disabled {
    background-color: #ccc;
    color: #666;
    cursor: not-allowed;
}

.status-online { color: #28a745; }
.status-offline { color: #dc3545; }
```

## 5. 网络请求工具

### 5.1 XHR请求封装

**功能**: 封装XMLHttpRequest，支持多种数据格式

```javascript
// GET请求
Network.XHR({
    url: "/api/users",
    method: "GET",
    option: {
        typeof: "json", // 响应数据类型
        success: function(response) {
            observer.users = response.data;
            observer.loading = false;
        }
    }
});

// POST请求 - 表单格式
Network.XHR({
    url: "/api/users",
    method: "POST",
    code: "form", // 请求数据格式
    data: {
        name: "新用户",
        email: "newuser@example.com"
    },
    option: {
        typeof: "json",
        success: function(response) {
            console.log("用户创建成功", response);
            observer.users.push(response.user);
        }
    }
});

// POST请求 - JSON格式
Network.XHR({
    url: "/api/login",
    method: "POST",
    code: "json", // 发送JSON数据
    data: {
        username: "admin",
        password: "123456"
    },
    header: { // 自定义请求头
        "Authorization": "Bearer token123",
        "X-Custom-Header": "custom-value"
    },
    option: {
        typeof: "json",
        success: function(response) {
            if (response.success) {
                observer.user = response.user;
                observer.isLoggedIn = true;
            }
        }
    }
});
```

### 5.2 JSONP跨域请求

**功能**: 支持跨域数据获取

```javascript
Network.JsonP(
    {
        url: "https://api.example.com/data",
        data: {
            id: 123,
            category: "electronics"
        }
    },
    {
        name: "callback", // 回调函数参数名
        value: "handleApiResponse", // 回调函数名
        functor: function(response) {
            console.log("JSONP响应数据", response);
            observer.externalData = response.data;
        }
    }
);
```

### 5.3 表单提交工具

**功能**: 程序化创建和提交表单

```javascript
// 文件下载表单
Network.Form({
    url: "/api/export",
    method: "POST",
    target: "_blank", // 新窗口打开
    data: {
        format: "xlsx",
        dateRange: "2023-01-01,2023-12-31",
        columns: "name,email,phone"
    }
});

// 支付跳转表单
Network.Form({
    url: "https://payment.example.com/pay",
    method: "POST",
    target: "_self",
    data: {
        orderId: observer.order.id,
        amount: observer.order.total,
        returnUrl: window.location.href
    }
});
```

## 6. 完整应用示例

### 6.1 待办事项应用

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Hetui Todo应用</title>
    <style>
        .todo-app { max-width: 600px; margin: 50px auto; padding: 20px; }
        .todo-input { width: 70%; padding: 10px; margin-right: 10px; }
        .todo-add { padding: 10px 20px; background: #007bff; color: white; border: none; }
        .todo-item { display: flex; align-items: center; padding: 10px; border-bottom: 1px solid #eee; }
        .todo-completed { text-decoration: line-through; opacity: 0.6; }
        .todo-actions { margin-left: auto; }
        .todo-actions button { margin-left: 5px; padding: 5px 10px; }
        .filter-buttons { margin: 20px 0; }
        .filter-buttons button { margin-right: 10px; padding: 8px 16px; }
        .filter-active { background: #007bff; color: white; }
    </style>
</head>
<body>
    <div class="todo-app">
        <h1>Hetui 待办事项</h1>
        
        <!-- 添加新任务 -->
        <div class="todo-input-section">
            <input type="text" class="todo-input" :value="newTodo:title" :value|name="newTodo:title" 
                   placeholder="输入新任务..." hetui="">
            <button class="todo-add" @click="Todo:Add" hetui="">添加任务</button>
        </div>
        
        <!-- 过滤按钮 -->
        <div class="filter-buttons">
            <button @click="Todo:SetFilter" 
                    boolean|class="filter:current == 'all' ? filter-active | ''" 
                    hetui="" data-filter="all">全部</button>
            <button @click="Todo:SetFilter" 
                    boolean|class="filter:current == 'active' ? filter-active | ''" 
                    hetui="" data-filter="active">未完成</button>
            <button @click="Todo:SetFilter" 
                    boolean|class="filter:current == 'completed' ? filter-active | ''" 
                    hetui="" data-filter="completed">已完成</button>
        </div>
        
        <!-- 任务统计 -->
        <div class="todo-stats">
            <span>总共 <strong :text="stats:total" hetui="">0</strong> 个任务</span>
            <span>未完成 <strong :text="stats:active" hetui="">0</strong> 个</span>
            <span>已完成 <strong :text="stats:completed" hetui="">0</strong> 个</span>
        </div>
        
        <!-- 任务列表 -->
        <div class="todo-list">
            <div class="todo-item" foreach:="filteredTodos" 
                 boolean|class="completed ? todo-completed | ''" hetui="">
                
                <input type="checkbox" :attr="checked|completed" 
                       @click="Todo:Toggle" hetui="">
                
                <span class="todo-text" :text="title" hetui="">任务标题</span>
                
                <div class="todo-actions">
                    <button @click="Todo:Edit" hetui="">编辑</button>
                    <button @click="Todo:Remove" hetui="">删除</button>
                </div>
            </div>
        </div>
        
        <!-- 批量操作 -->
        <div class="bulk-actions" boolean|show="todos:length > 0" hetui="">
            <button @click="Todo:ToggleAll" hetui="">全部完成/未完成</button>
            <button @click="Todo:ClearCompleted" hetui="">清除已完成</button>
        </div>
    </div>

    <script src="hetui.js"></script>
    <script>
        // 应用数据模型
        const todoData = {
            newTodo: {
                title: ""
            },
            todos: [
                { id: 1, title: "学习Hetui框架", completed: false, createdAt: new Date() },
                { id: 2, title: "编写示例代码", completed: true, createdAt: new Date() },
                { id: 3, title: "测试应用功能", completed: false, createdAt: new Date() }
            ],
            filter: {
                current: "all" // all, active, completed
            },
            stats: {
                total: 0,
                active: 0,
                completed: 0
            },
            filteredTodos: []
        };

        // Todo控制器
        Hetui.Todo = {
            Add: function(event, htm, observer) {
                const title = observer.newTodo.title.trim();
                if (!title) return;
                
                const newTodo = {
                    id: Date.now(),
                    title: title,
                    completed: false,
                    createdAt: new Date()
                };
                
                observer.todos.push(newTodo);
                observer.newTodo.title = ""; // 清空输入框
                
                this.UpdateStats(observer);
                this.ApplyFilter(observer);
            },
            
            Toggle: function(event, htm, observer) {
                // 获取当前项的索引，这里需要额外的逻辑来确定
                // 在实际使用中，可能需要通过数据属性来标识
                const index = htm.Node.getAttribute('data-index');
                if (index !== null) {
                    observer.todos[index].completed = !observer.todos[index].completed;
                    this.UpdateStats(observer);
                    this.ApplyFilter(observer);
                }
            },
            
            Remove: function(event, htm, observer) {
                const index = htm.Node.getAttribute('data-index');
                if (index !== null) {
                    observer.todos.splice(index, 1);
                    this.UpdateStats(observer);
                    this.ApplyFilter(observer);
                }
            },
            
            SetFilter: function(event, htm, observer) {
                const filter = event.target.getAttribute('data-filter');
                observer.filter.current = filter;
                this.ApplyFilter(observer);
            },
            
            UpdateStats: function(observer) {
                const todos = observer.todos;
                observer.stats.total = todos.length;
                observer.stats.completed = todos.filter(todo => todo.completed).length;
                observer.stats.active = todos.length - observer.stats.completed;
            },
            
            ApplyFilter: function(observer) {
                const filter = observer.filter.current;
                let filtered = observer.todos;
                
                switch (filter) {
                    case 'active':
                        filtered = observer.todos.filter(todo => !todo.completed);
                        break;
                    case 'completed':
                        filtered = observer.todos.filter(todo => todo.completed);
                        break;
                    case 'all':
                    default:
                        filtered = observer.todos;
                        break;
                }
                
                observer.filteredTodos = filtered;
            },
            
            ToggleAll: function(event, htm, observer) {
                const allCompleted = observer.todos.every(todo => todo.completed);
                observer.todos.forEach(todo => {
                    todo.completed = !allCompleted;
                });
                this.UpdateStats(observer);
                this.ApplyFilter(observer);
            },
            
            ClearCompleted: function(event, htm, observer) {
                observer.todos = observer.todos.filter(todo => !todo.completed);
                this.UpdateStats(observer);
                this.ApplyFilter(observer);
            }
        };

        // 启动应用
        const observer = Hetui.Observe(todoData);
        
        // 初始化统计和过滤
        Hetui.Todo.UpdateStats(observer);
        Hetui.Todo.ApplyFilter(observer);
    </script>
</body>
</html>
```

## 7. 最佳实践和注意事项

### 7.1 性能优化建议

1. **避免深度嵌套**: 数据结构不要过于复杂
2. **合理使用循环**: 大量数据时考虑分页或虚拟滚动
3. **事件代理**: 对于动态生成的元素，使用事件代理
4. **批量更新**: 避免频繁的单个属性更新

### 7.2 代码组织规范

```javascript
// 推荐的控制器组织方式
const Controllers = {
    // 用户相关操作
    User: {
        login: function(event, htm, observer) { /* ... */ },
        logout: function(event, htm, observer) { /* ... */ },
        updateProfile: function(event, htm, observer) { /* ... */ }
    },
    
    // 界面操作
    UI: {
        showModal: function(event, htm, observer) { /* ... */ },
        hideModal: function(event, htm, observer) { /* ... */ },
        toggleSidebar: function(event, htm, observer) { /* ... */ }
    },
    
    // 数据操作
    Data: {
        save: function(event, htm, observer) { /* ... */ },
        load: function(event, htm, observer) { /* ... */ },
        validate: function(event, htm, observer) { /* ... */ }
    },
    
    // 表单处理
    Form: {
        submit: function(event, form, htm, observer) { /* ... */ },
        reset: function(event, htm, observer) { /* ... */ },
        validate: function(event, htm, observer) { /* ... */ }
    }
};

// 将控制器合并到Hetui对象
Object.assign(Hetui, Controllers);
```

### 7.3 错误处理和调试

```javascript
// 添加全局错误处理
Hetui.ErrorHandler = {
    handleNetworkError: function(xhr, observer) {
        observer.errorMessage = "网络请求失败，请检查网络连接";
        observer.showError = true;
        console.error("Network Error:", xhr.status, xhr.responseText);
    },
    
    handleValidationError: function(errors, observer) {
        observer.validationErrors = errors;
        observer.showValidationErrors = true;
    },
    
    clearErrors: function(observer) {
        observer.errorMessage = "";
        observer.showError = false;
        observer.validationErrors = {};
        observer.showValidationErrors = false;
    }
};

// 网络请求错误处理示例
Network.XHR({
    url: "/api/data",
    method: "GET",
    option: {
        typeof: "json",
        success: function(response) {
            observer.data = response;
            Hetui.ErrorHandler.clearErrors(observer);
        },
        error: function(xhr) {
            Hetui.ErrorHandler.handleNetworkError(xhr, observer);
        }
    }
});
```

### 7.4 数据验证规范

```javascript
// 验证工具函数
const Validators = {
    required: function(value) {
        return value != null && value !== '';
    },
    
    email: function(value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    },
    
    minLength: function(value, min) {
        return value && value.length >= min;
    },
    
    maxLength: function(value, max) {
        return !value || value.length <= max;
    }
};

// 表单验证控制器
Hetui.Validation = {
    validateField: function(fieldName, value, rules, observer) {
        const errors = [];
        
        rules.forEach(rule => {
            if (typeof rule === 'string') {
                if (!Validators[rule](value)) {
                    errors.push(`${fieldName} ${rule} validation failed`);
                }
            } else if (typeof rule === 'object') {
                const { type, param, message } = rule;
                if (!Validators[type](value, param)) {
                    errors.push(message || `${fieldName} ${type} validation failed`);
                }
            }
        });
        
        observer.validationErrors = observer.validationErrors || {};
        observer.validationErrors[fieldName] = errors;
        
        return errors.length === 0;
    },
    
    validateForm: function(formData, rules, observer) {
        let isValid = true;
        
        Object.keys(rules).forEach(fieldName => {
            const fieldValue = formData[fieldName];
            const fieldRules = rules[fieldName];
            const fieldValid = this.validateField(fieldName, fieldValue, fieldRules, observer);
            
            if (!fieldValid) {
                isValid = false;
            }
        });
        
        return isValid;
    }
};

// 使用示例
const validationRules = {
    username: [
        'required',
        { type: 'minLength', param: 3, message: '用户名至少3个字符' },
        { type: 'maxLength', param: 20, message: '用户名最多20个字符' }
    ],
    email: [
        'required',
        { type: 'email', message: '请输入有效的邮箱地址' }
    ],
    password: [
        'required',
        { type: 'minLength', param: 6, message: '密码至少6个字符' }
    ]
};

// 在表单提交时验证
Hetui.Form.SubmitWithValidation = function(event, form, htm, observer) {
    event.Bubble(false);
    
    const isValid = Hetui.Validation.validateForm(form, validationRules, observer);
    
    if (isValid) {
        // 执行提交逻辑
        console.log("表单验证通过，提交数据:", form);
    } else {
        console.log("表单验证失败:", observer.validationErrors);
    }
};
```

### 7.5 组件化开发模式

```javascript
// 组件定义
const Components = {
    // 模态框组件
    Modal: {
        create: function(options, observer) {
            const modalId = 'modal_' + Date.now();
            observer.modals = observer.modals || {};
            observer.modals[modalId] = {
                visible: false,
                title: options.title || '提示',
                content: options.content || '',
                onConfirm: options.onConfirm || null,
                onCancel: options.onCancel || null
            };
            return modalId;
        },
        
        show: function(modalId, observer) {
            if (observer.modals && observer.modals[modalId]) {
                observer.modals[modalId].visible = true;
            }
        },
        
        hide: function(modalId, observer) {
            if (observer.modals && observer.modals[modalId]) {
                observer.modals[modalId].visible = false;
            }
        }
    },
    
    // 通知组件
    Notification: {
        show: function(message, type, observer, duration = 3000) {
            const notificationId = 'notification_' + Date.now();
            observer.notifications = observer.notifications || [];
            
            observer.notifications.push({
                id: notificationId,
                message: message,
                type: type, // success, error, warning, info
                visible: true
            });
            
            // 自动隐藏
            setTimeout(() => {
                this.hide(notificationId, observer);
            }, duration);
            
            return notificationId;
        },
        
        hide: function(notificationId, observer) {
            if (observer.notifications) {
                const index = observer.notifications.findIndex(n => n.id === notificationId);
                if (index !== -1) {
                    observer.notifications.splice(index, 1);
                }
            }
        }
    },
    
    // 加载状态组件
    Loading: {
        show: function(message, observer) {
            observer.loading = {
                visible: true,
                message: message || '加载中...'
            };
        },
        
        hide: function(observer) {
            observer.loading = {
                visible: false,
                message: ''
            };
        }
    }
};

// 组件使用示例
Hetui.App = {
    showConfirmDialog: function(event, htm, observer) {
        const modalId = Components.Modal.create({
            title: '确认操作',
            content: '确定要删除这个项目吗？',
            onConfirm: function() {
                console.log('用户确认删除');
                Components.Modal.hide(modalId, observer);
            },
            onCancel: function() {
                console.log('用户取消操作');
                Components.Modal.hide(modalId, observer);
            }
        }, observer);
        
        Components.Modal.show(modalId, observer);
    },
    
    saveData: function(event, htm, observer) {
        Components.Loading.show('保存中...', observer);
        
        Network.XHR({
            url: '/api/save',
            method: 'POST',
            code: 'json',
            data: observer.formData,
            option: {
                typeof: 'json',
                success: function(response) {
                    Components.Loading.hide(observer);
                    Components.Notification.show('保存成功', 'success', observer);
                },
                error: function(xhr) {
                    Components.Loading.hide(observer);
                    Components.Notification.show('保存失败', 'error', observer);
                }
            }
        });
    }
};
```

### 7.6 高级模板语法

```html
<!-- 条件模板 -->
<div hetui="">
    <div boolean|show="user:role == 'admin'" hetui="">
        <h2>管理员面板</h2>
        <button @click="Admin:ManageUsers" hetui="">用户管理</button>
    </div>
    
    <div boolean|show="user:role == 'user'" hetui="">
        <h2>用户面板</h2>
        <button @click="User:ViewProfile" hetui="">查看资料</button>
    </div>
</div>

<!-- 动态属性绑定 -->
<img :attr="src|product:images:0" 
     :attr="alt|product:name" 
     :attr="title|product:description" 
     hetui="">

<!-- 样式绑定 -->
<div :style|width="progress:percentage + '%'" 
     :style|height="settings:barHeight + 'px'" 
     hetui="">
    进度条
</div>

<!-- 复杂表单绑定 -->
<form @submit="Form:AdvancedSubmit" hetui="">
    <fieldset>
        <legend>用户信息</legend>
        <input type="text" :value|name="user:profile:firstName" placeholder="名" hetui="">
        <input type="text" :value|name="user:profile:lastName" placeholder="姓" hetui="">
        <input type="email" :value|name="user:profile:email" placeholder="邮箱" hetui="">
    </fieldset>
    
    <fieldset>
        <legend>偏好设置</legend>
        <select :value|name="user:preferences:language" hetui="">
            <option value="zh">中文</option>
            <option value="en">English</option>
        </select>
        
        <label>
            <input type="checkbox" :value|name="user:preferences:notifications" hetui="">
            接收通知
        </label>
    </fieldset>
    
    <button type="submit">保存设置</button>
</form>

<!-- 高级列表渲染 -->
<div class="data-table">
    <div class="table-header">
        <div class="table-row">
            <div class="table-cell">姓名</div>
            <div class="table-cell">邮箱</div>
            <div class="table-cell">状态</div>
            <div class="table-cell">操作</div>
        </div>
    </div>
    
    <div class="table-body">
        <div class="table-row" foreach:="users" hetui="">
            <div class="table-cell" :text="name" hetui=""></div>
            <div class="table-cell" :text="email" hetui=""></div>
            <div class="table-cell">
                <span boolean|class="active ? status-active | status-inactive" 
                      :text="active ? '在线' : '离线'" hetui=""></span>
            </div>
            <div class="table-cell">
                <button @click="User:Edit" hetui="">编辑</button>
                <button @click="User:Delete" hetui="">删除</button>
            </div>
        </div>
    </div>
</div>
```

## 8. 提示词格式总结

### 8.1 数据绑定提示词

```
当使用Hetui进行数据绑定时，请遵循以下格式：

1. 文本绑定: :text="数据路径"
   - 单级: :text="name"
   - 多级: :text="user:profile:name"

2. 属性绑定: :attr="属性名|数据路径"
   - 示例: :attr="src|user:avatar"

3. 值绑定: :value="数据路径" 或 :value|name="数据路径"
   - 单向: :value="form:username"
   - 双向: :value|name="form:username"

4. 必须添加 hetui="" 属性激活框架功能
```

### 8.2 事件处理提示词

```
Hetui事件处理遵循以下规范：

1. 事件绑定: @事件名="控制器:方法名"
   - 点击: @click="User:Login"
   - 表单: @submit="Form:Save"

2. 内联函数: @事件名|functor="参数 => 逻辑"
   - 示例: @click|functor="event => console.log('clicked')"

3. 控制器定义:
   Hetui.控制器名 = {
       方法名: function(event, htm, observer) {
           // event: 事件对象
           // htm: HTML节点对象
           // observer: 数据观察者
       }
   };

4. 事件冒泡控制: event.Bubble(false)
```

### 8.3 列表渲染提示词

```
Hetui列表渲染使用foreach:指令：

1. 基础语法: foreach:="数据数组路径"
   - <li foreach:="items" hetui="">

2. 在循环内访问：
   - 当前项数据: 直接使用属性名
   - 循环索引: 使用 #index
   - 示例: <span :text="#index" hetui="">序号</span>

3. 数据结构要求：
   - 必须是数组格式
   - 数组元素为对象时，可直接访问对象属性
   
4. 动态更新：
   - 添加: observer.items.push(newItem)
   - 删除: observer.items.splice(index, 1)
   - 修改: observer.items[index].property = newValue
```

### 8.4 条件渲染提示词

```
Hetui条件渲染支持多种方式：

1. 显示控制: boolean|show="条件路径"
   - 示例: boolean|show="user:isLoggedIn"

2. 样式控制: boolean|class="条件 ? 真值样式 | 假值样式"
   - 示例: boolean|class="user:active ? active-class | inactive-class"

3. 手动控制: #hide="控制器名称"
   - HTML: <div #hide="modalController" hetui="">
   - JS: observer.modalController(true/false)

4. 条件格式: 支持简单的布尔表达式
   - 等于: user:role == 'admin'
   - 存在: user:permissions:admin
   - 取反: user:isLoggedIn|false
```

### 8.5 完整开发流程提示词

```
使用Hetui开发应用的标准流程：

1. 数据模型定义:
   const appData = {
       // 定义应用状态数据
   };

2. 创建观察者:
   const observer = Hetui.Observe(appData);

3. HTML模板编写:
   - 添加hetui=""属性
   - 使用指令绑定数据
   - 绑定事件处理

4. 控制器实现:
   Hetui.ControllerName = {
       method: function(event, htm, observer) {
           // 处理业务逻辑
           // 更新observer数据
       }
   };

5. 网络请求:
   Network.XHR({
       url: "...",
       method: "...",
       option: { success: function(response) {} }
   });

6. 调试和优化:
   - 检查数据绑定
   - 验证事件处理
   - 优化性能
```

这个完整的指南涵盖了Hetui框架的所有核心功能和使用方法，提供了详细的代码示例和最佳实践建议。框架适合构建中小型的交互式Web应用，具有简单直观的学习曲线。
        