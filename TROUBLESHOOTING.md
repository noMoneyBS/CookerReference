# Render 部署故障排除指南

## 常见错误及解决方案

### 1. "No open ports detected" 错误

**错误信息**：
```
==> No open ports detected on 0.0.0.0, continuing to scan...
==> Docs on specifying a port: https://render.com/docs/web-services#port-binding
```

**原因**：
- 服务器没有绑定到 `0.0.0.0`
- 服务器没有正确启动
- 端口配置错误

**解决方案**：
1. 确保服务器绑定到 `0.0.0.0`：
   ```javascript
   app.listen(PORT, '0.0.0.0', () => {
     console.log(`🚀 Server running on port ${PORT}`);
   });
   ```

2. 检查环境变量：
   ```
   NODE_ENV=production
   PORT=10000
   USE_MOCK=true (用于测试)
   ```

3. 确保服务器在所有环境下都会启动

### 2. "Missing script: start" 错误

**错误信息**：
```
npm error Missing script: "start"
```

**原因**：
- 前端服务被错误创建为 Web Service
- package.json 中缺少 start 脚本

**解决方案**：
1. 前端服务应该是 Static Site 类型
2. 后端服务应该是 Web Service 类型
3. 检查 render.yaml 配置

### 3. 数据库连接失败

**错误信息**：
```
❌ 数据库初始化失败
```

**解决方案**：
1. 设置 `USE_MOCK=true` 进行测试
2. 检查 DATABASE_URL 格式
3. 确保数据库服务已创建

## 测试步骤

### 1. 本地测试
```bash
# 测试服务器启动
node test-server-start.js

# 测试构建
npm run build
```

### 2. 环境变量检查
确保以下环境变量正确设置：
```
NODE_ENV=production
PORT=10000
USE_MOCK=true
DATABASE_URL=postgresql://...
JWT_SECRET=your_secret
```

### 3. 健康检查
部署后访问：`https://your-backend.onrender.com/test`

应该返回：
```json
{
  "message": "API is working!",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 部署检查清单

- [ ] 代码已推送到 GitHub
- [ ] 使用 Blueprint 部署（推荐）
- [ ] 环境变量配置正确
- [ ] 服务类型正确（后端：Web Service，前端：Static Site）
- [ ] 健康检查路径可访问
- [ ] 数据库连接正常

## 日志查看

在 Render Dashboard 中：
1. 点击服务
2. 查看 "Logs" 标签页
3. 检查启动日志和错误信息

## 联系支持

如果问题仍然存在：
1. 查看 Render 文档：https://render.com/docs
2. 检查服务日志
3. 验证配置是否正确
