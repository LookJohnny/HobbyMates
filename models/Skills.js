const mongoose = require('mongoose');

// 使用mongoose.Schema定义用户数据模型
const skillSchema = new mongoose.Schema({
    userID: String,
    skillProvide: [String] 
}); 

// 创建User模型，与数据库中的"users"集合对应
const Skill = mongoose.model('Skill', skillSchema);

// 导出User模型，使其可以在其他文件中通过require导入
module.exports = Skill;