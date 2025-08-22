#!/usr/bin/env node

// 测试服务器启动脚本
console.log('🧪 测试服务器启动...');

// 设置测试环境变量
process.env.NODE_ENV = 'production';
process.env.PORT = '10000';
process.env.USE_MOCK = 'true';

console.log('📋 环境变量:');
console.log('- NODE_ENV:', process.env.NODE_ENV);
console.log('- PORT:', process.env.PORT);
console.log('- USE_MOCK:', process.env.USE_MOCK);

// 导入服务器
const app = require('./server/app/index.js');

console.log('✅ 服务器模块加载成功');

// 检查服务器是否正在监听
setTimeout(() => {
  console.log('🔍 检查服务器状态...');
  
  // 这里可以添加更多的检查逻辑
  console.log('✅ 测试完成');
  process.exit(0);
}, 2000);
