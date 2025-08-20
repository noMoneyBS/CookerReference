// 测试Vercel API的脚本
const axios = require('axios');

const API_BASE = 'https://your-app.vercel.app'; // 替换为你的Vercel URL

const testAPI = async () => {
  try {
    console.log('🧪 开始测试Vercel API...');
    
    // 测试基础API
    console.log('\n1. 测试基础API...');
    const testResponse = await axios.get(`${API_BASE}/api/test`);
    console.log('✅ 基础API:', testResponse.data);
    
    // 测试健康检查
    console.log('\n2. 测试健康检查...');
    const healthResponse = await axios.get(`${API_BASE}/api/health`);
    console.log('✅ 健康检查:', healthResponse.data);
    
    // 测试注册
    console.log('\n3. 测试用户注册...');
    const registerResponse = await axios.post(`${API_BASE}/api/auth/register`, {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });
    console.log('✅ 注册成功:', registerResponse.data);
    
    // 测试登录
    console.log('\n4. 测试用户登录...');
    const loginResponse = await axios.post(`${API_BASE}/api/auth/login`, {
      email: 'test@example.com',
      password: 'password123'
    });
    console.log('✅ 登录成功:', loginResponse.data);
    
    // 测试社区食谱
    console.log('\n5. 测试社区食谱...');
    const recipesResponse = await axios.get(`${API_BASE}/api/community/recipes`);
    console.log('✅ 社区食谱:', recipesResponse.data);
    
    console.log('\n🎉 所有API测试通过！');
    
  } catch (error) {
    console.error('❌ API测试失败:');
    if (error.response) {
      console.error('状态码:', error.response.status);
      console.error('响应数据:', error.response.data);
      console.error('响应头:', error.response.headers);
    } else if (error.request) {
      console.error('请求错误:', error.request);
    } else {
      console.error('错误信息:', error.message);
    }
  }
};

// 如果直接运行此文件
if (require.main === module) {
  testAPI();
}

module.exports = { testAPI };
