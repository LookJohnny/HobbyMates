const express = require('express');
const router = express.Router();
const { spam } = require('child_process');

router.post('/match-interests', req, res => {
    const { skillRequired, skillProvide } = req.body;

    // 调用BERT模型
    const pythonProcess = spawn('python', ['BERT.py', skillRequire, JSON.stringify(skillsProvide)]);

    pythonProcess.stdout.on('data', (data) => {
        // 获取Python脚本的输出
        const result = data.toString().trim();
        // 假设Python脚本输出的是'True'或'False'
        const matchFound = result === 'True';
        
        // 发送结果给客户端
        res.json({ matchFound });
});

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        res.status(500).json({ error: data.toString() });
    });
});

module.exports = router;