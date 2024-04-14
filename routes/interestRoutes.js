const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');
const User = require('../models/User');
const { spawn } = require('child_process');
const { url } = require('inspector');

router.post('/find-users', async (req, res) => {
  const { interest } = req.body;
  const matchingDetails = [];
  console.log('Interest:', interest);

  try {
    const skills = await Skill.find({});

    for (let skill of skills) {
        
        
      const skillString = skill.skillProvide.join(',');
      const pythonProcess = spawn('C:\\Users\\Syoinn\\AppData\\Local\\Microsoft\\WindowsApps\\python.exe', ['./routes/BERT.py', interest, skillString]);
    

      
      for await (const data of pythonProcess.stdout) {
        console.log('Data:', data.toString());
        let score = parseFloat(data.toString());
        if (score > 0.7) {
          // 找到符合条件的Skill文档后，立即查找对应的User文档
          const user = await User.findOne({ userID: skill.userID });
          if (user) {
            
            matchingDetails.push({
              userID: user.userID,
              username: user.username,
              url: user.url,
              skillRequire: user.skillRequire,
              skillProvide: skill.skillProvide,
            });
          }
        }
      }
    }

    res.json(matchingDetails); // 发送包含所有符合条件用户的详细信息给前端
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send(error.toString());
  }
});


module.exports = router;
