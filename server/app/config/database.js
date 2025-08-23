const { Sequelize, DataTypes } = require("sequelize");

// 解析数据库 URL 并强制使用 IPv4
const getDatabaseConfig = () => {
  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    throw new Error('DATABASE_URL 环境变量未设置');
  }

  // 基础配置
  const config = {
    dialect: "postgres",
    logging: false, // 关闭SQL日志
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    dialectOptions: {
      // Render 生产环境需要 SSL
      ssl: {
        require: true,
        rejectUnauthorized: false
      },
      // 连接超时设置
      connectTimeout: 60000,
      // 强制 IPv4
      family: 4
    },
    // 重试配置
    retry: {
      max: 3,
      backoffBase: 1000,
      backoffExponent: 1.5
    }
  };

  return config;
};

const sequelize = new Sequelize(process.env.DATABASE_URL, getDatabaseConfig());

// 定义模型关联关系
const setupAssociations = () => {
  const User = require("../models/User");
  const Preference = require("../models/Preference");
  const UserPreference = require("../models/UserPreference");
  const RecipeRating = require("../models/RecipeRating");
  const CommunityRecipe = require("../models/CommunityRecipe");
  const UserInteraction = require("../models/UserInteraction");

  // User 关联
  User.hasOne(Preference, { foreignKey: "userId" });
  Preference.belongsTo(User, { foreignKey: "userId" });

  User.hasMany(UserPreference, { foreignKey: "userId" });
  UserPreference.belongsTo(User, { foreignKey: "userId" });

  User.hasMany(RecipeRating, { foreignKey: "userId" });
  RecipeRating.belongsTo(User, { foreignKey: "userId" });

  User.hasMany(CommunityRecipe, { foreignKey: "authorId", as: "author" });
  CommunityRecipe.belongsTo(User, { foreignKey: "authorId", as: "author" });

  User.hasMany(UserInteraction, { foreignKey: "userId" });
  UserInteraction.belongsTo(User, { foreignKey: "userId" });

  // CommunityRecipe 关联
  CommunityRecipe.hasMany(UserInteraction, { foreignKey: "recipeId" });
  UserInteraction.belongsTo(CommunityRecipe, { foreignKey: "recipeId" });
};

// 初始化数据库连接和模型
const initializeDatabase = async () => {
  try {
    console.log('🔍 正在连接数据库...');
    console.log(`📋 数据库配置:`);
    console.log(`   - 环境: ${process.env.NODE_ENV || 'development'}`);
    console.log(`   - SSL: ${process.env.NODE_ENV === 'production' ? '启用' : '禁用'}`);
    console.log(`   - 强制IPv4: 是`);
    
    // 测试数据库连接
    await sequelize.authenticate();
    console.log('✅ 数据库连接成功');
    
    // 设置模型关联
    setupAssociations();
    console.log('✅ 模型关联设置完成');
    
    // 同步数据库（开发环境使用）
    if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync({ force: false });
      console.log('✅ 数据库同步完成');
    } else {
      console.log('🔧 生产环境：跳过数据库同步');
    }
    
  } catch (error) {
    console.error('数据库初始化失败:', error);
    throw error;
  }
};

module.exports = { sequelize, DataTypes, initializeDatabase };
