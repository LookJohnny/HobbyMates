const mongoose = require('mongoose');

// 使用mongoose.Schema定义用户数据模型
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // 用户名，必须填写且唯一
  userID: { type: String, required: true, unique: true }, // 用户ID，必须填写且唯一
  password: { type: String, required: true }, // 用户密码，必须填写
  skills: [{
    skillsProvide: String, // 用户提供的技能
    skillsRequire: String, // 用户想要学习的技能
  }],
  userInfo: [{
    location: String, // 用户位置
    age: Number, // 用户年龄，使用Number类型
    name: String, // 用户真实姓名
  }]
}); 

// 创建User模型，与数据库中的"users"集合对应
const User = mongoose.model('User', userSchema);

// 导出User模型，使其可以在其他文件中通过require导入
module.exports = User;
