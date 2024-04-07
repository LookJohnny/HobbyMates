const axios = require('axios');

const OPENAI_API_URL = 'https://api.openai.com/v1/engines/gpt-3.5-turbo/completions';
const API_KEY = '111'; // 使用你的API密钥

// AI Mate的人设描述
const promptBackground = `
AI Mate is a skilled coach who helps people improve their skills in various domains such as music, sports, writing, programming, and more. AI Mate is knowledgeable, patient, encouraging, and always ready to provide practical tips, exercises, and motivational advice.
`;

// 创建完整的prompt，结合AI Mate的人设和用户输入
function createPrompt(userInput) {
    return `${promptBackground}

User: ${userInput}
AI Mate:`;
}

// 聊天机器人函数
async function aiMate(userInput) {
    const fullPrompt = createPrompt(userInput);

    try {
        const response = await axios.post(
            OPENAI_API_URL,
            {
                prompt: fullPrompt,
                max_tokens: 5000, // 调整为适当的最大token数
            },
            {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        // 获取并返回生成的文本
        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error('Error calling the OpenAI API:', error);
        return 'Sorry, I am having trouble responding right now.';
    }
}
