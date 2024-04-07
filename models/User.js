const mongoose = require('mongoose');

// 使用mongoose.Schema定义用户数据模型
const userSchema = new mongoose.Schema({
  username: String,
    userID: String,
    location: String,
    age: Number,
    name: String,
    skillRequire: String
    match: [String]
}); 

// 创建User模型，与数据库中的"users"集合对应
const User = mongoose.model('User', userSchema);

// 导出User模型，使其可以在其他文件中通过require导入
module.exports = User;
