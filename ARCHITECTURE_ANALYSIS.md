# 项目架构分析

## 当前架构问题

### 1. 模块系统冲突
- **根目录**: `"type": "module"` (ES模块)
- **后端**: CommonJS (`require/module.exports`)
- **前端**: ES模块 (`import/export`)

### 2. 开发vs生产环境差异
- **开发环境**: Vite代理 `/api` → `localhost:5001`
- **生产环境**: 前端和后端分离部署

### 3. API路径配置
- **前端期望**: `/api/auth`, `/api/preference` 等
- **后端实际**: `/auth`, `/preference` 等
- **开发环境**: Vite代理处理路径转换
- **生产环境**: 需要直接连接后端URL

## 解决方案

### 方案1: 保持当前架构，修复配置

#### 前端配置
```javascript
// src/config.js
export const API_BASE =
  import.meta.env.VITE_API_URL ??  // 生产环境: https://backend.onrender.com
  '/api';                          // 开发环境: /api (通过Vite代理)
```

#### Vite配置
```javascript
// vite.config.js
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // 开发环境路径转换
      },
    },
  },
});
```

#### Render配置
```yaml
# render.yaml
services:
  - type: web
    name: cooker-backend
    # 后端直接暴露路由，无/api前缀
    
  - type: web
    name: cooker-frontend
    envVars:
      - key: VITE_API_URL
        value: https://cooker-backend.onrender.com  # 直接连接后端
```

### 方案2: 统一API路径

#### 后端添加/api前缀
```javascript
// server/app/index.js
app.use("/api/auth", require("./routes/auth"));
app.use("/api/preference", require("./routes/preference"));
// ...
```

#### 前端配置
```javascript
// src/config.js
export const API_BASE = 
  import.meta.env.VITE_API_URL ?? 
  '/api';
```

## 推荐方案

**选择方案1**，因为：
1. 最小化代码修改
2. 保持开发环境的一致性
3. 后端路由更简洁

## 实施步骤

1. **验证当前配置**
2. **测试开发环境**
3. **部署到Render**
4. **验证生产环境**

## 测试检查点

### 开发环境
- [ ] `npm run dev` 启动前端
- [ ] `npm run api:dev` 启动后端
- [ ] 前端能正常调用后端API

### 生产环境
- [ ] 后端服务正常启动
- [ ] 健康检查 `/test` 可访问
- [ ] 前端构建成功
- [ ] 前端能连接到后端API
