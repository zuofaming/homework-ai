// api/analyze.js - Vercel Serverless Function

export default async function handler(req, res) {
    // 允许跨域
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // 处理 OPTIONS 请求
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: '只支持 POST 请求' });
    }

    try {
        const { apiKey, imageData } = req.body;

        if (!apiKey) {
            return res.status(400).json({ error: '缺少 API Key' });
        }

        if (!imageData) {
            return res.status(400).json({ error: '缺少图片数据' });
        }

        // 验证图片数据格式
        if (!imageData.startsWith('data:image/')) {
            return res.status(400).json({ error: '图片格式不正确' });
        }

        // 调用阿里云通义千问 API，增加超时控制
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 60000); // 60秒超时

        try {
            const response = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: 'qwen-vl-plus',
                    input: {
                        messages: [{
                            role: 'user',
                            content: [
                                {
                                    image: imageData
                                },
                                {
                                    text: `你是一个温柔耐心的作业辅导老师。请仔细分析这张作业照片，找出错题并给出学情诊断。

请用JSON格式返回结果（不要用markdown代码块包裹，直接返回纯JSON）：

{
  "totalQuestions": 总题数（估算，如果看不清就写0）,
  "correctCount": 做对的题目数,
  "errors": [
    {
      "questionNumber": "第几题（比如：第3题、问题1等）",
      "studentAnswer": "学生的答案",
      "issue": "问题是什么（用小学生能懂的话）",
      "correctAnswer": "正确答案（如果能判断的话）",
      "suggestion": "改进建议（鼓励为主，不要说教）",
      "knowledgePoint": "涉及的知识点",
      "difficulty": "难度（简单/中等/困难）"
    }
  ],
  "overallComment": "总体评价（要鼓励、积极、温暖）",
  "learningDiagnosis": {
    "strengths": ["擅长的方面1", "擅长的方面2"],
    "weaknesses": ["需要加强的方面1", "需要加强的方面2"],
    "suggestions": ["学习建议1", "学习建议2"],
    "masteryLevel": "掌握程度（优秀/良好/一般/需加强）"
  }
}

注意：
1. 用中文，语气要温柔友好
2. 如果照片不清楚或不是作业，在errors里说明
3. 建议要具体、可操作
4. 多鼓励，少批评
5. 只返回JSON，不要其他任何文字
6. 学情诊断要详细、有针对性`
                                }
                            ]
                        }]
                    }
                }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('阿里云API错误:', errorText);

                // 提供更友好的错误信息
                let errorMessage = 'API请求失败';
                if (response.status === 401) {
                    errorMessage = 'API Key 无效，请检查是否正确';
                } else if (response.status === 429) {
                    errorMessage = 'API调用次数超限，请稍后再试';
                } else if (response.status === 400) {
                    errorMessage = '请求参数错误，请确保图片格式正确';
                }

                return res.status(response.status).json({
                    error: `${errorMessage}: ${errorText.substring(0, 200)}`
                });
            }

            const data = await response.json();
            return res.status(200).json(data);

        } catch (fetchError) {
            clearTimeout(timeoutId);

            if (fetchError.name === 'AbortError') {
                return res.status(408).json({
                    error: '请求超时，请检查网络连接或稍后再试'
                });
            }
            throw fetchError;
        }

    } catch (error) {
        console.error('服务器错误:', error);
        return res.status(500).json({
            error: error.message || '服务器内部错误，请稍后重试'
        });
    }
}
