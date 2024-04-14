const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // 为了简化跨域请求的处理

// 替换为你的MongoDB连接字符串
const mongoDB = 'mongodb://172.20.10.2:27017/meet_hobby';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// 导入定义的路由
const matchingRoutes = require('./routes/interestRoutes'); // 确保路径正确

const app = express();
app.use(express.json()); // 用于解析JSON格式的请求体

app.use(cors()); // 允许所有跨域请求，实际部署时可能需要更严格的设置

// 使用路由
app.use('/', matchingRoutes); // 使用根路由

// 简单的根路由
app.get('/', (req, res) => {
  res.send('Welcome to HobbyMate!');
});

// 设置端口
const port = process.env.PORT || 3000;

// 监听端口
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running and accessible within the LAN on port ${port}`);
});


  
