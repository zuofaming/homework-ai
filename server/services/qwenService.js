/**
 * 通义千问 API 服务
 */

const QWEN_API_URL = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation';
const MODEL = 'qwen-vl-plus';
const REQUEST_TIMEOUT = 60000; // 60秒

/**
 * 分析作业图片
 */
exports.analyzeImage = async (imageData, apiKey) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    try {
        const response = await fetch(QWEN_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: MODEL,
                input: {
                    messages: [{
                        role: 'user',
                        content: [
                            { image: imageData },
                            {
                                text: `你是一个专业的作业辅导老师。请仔细分析这张作业照片，识别所有题目并找出错题。

请用JSON格式返回结果（直接返回纯JSON，不要markdown代码块）：

{
  "totalQuestions": 总题数,
  "correctCount": 做对的题目数,
  "errors": [
    {
      "questionNumber": "题号",
      "questionContent": "题目内容",
      "studentAnswer": "学生的答案",
      "correctAnswer": "正确答案",
      "analysis": "错误原因分析",
      "suggestion": "改进建议",
      "knowledgePoint": "知识点",
      "difficulty": "简单/中等/困难"
    }
  ],
  "overallComment": "总体评价（鼓励为主）",
  "strengths": ["优势1", "优势2"],
  "weaknesses": ["需要加强的方面1", "需要加强的方面2"],
  "studyTips": ["学习建议1", "学习建议2"]
}

要求：
1. 语气要温柔友好、鼓励为主
2. 分析要详细、建议要具体可操作
3. 如果照片不清楚，在errors中说明
4. 只返回JSON，不要其他文字`
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
            throw new Error(getErrorMessage(response.status, errorText));
        }

        const data = await response.json();

        // 提取AI返回的文本
        let textContent = data.output.choices[0].message.content[0].text;

        // 清理markdown代码块标记
        textContent = textContent
            .replace(/```json\n?/g, '')
            .replace(/```\n?/g, '')
            .trim();

        // 解析JSON
        try {
            const result = JSON.parse(textContent);
            result.timestamp = Date.now();
            return result;
        } catch (parseError) {
            console.error('JSON解析错误:', parseError);
            console.error('原始文本:', textContent);

            // 返回友好的错误格式
            return {
                totalQuestions: 0,
                correctCount: 0,
                errors: [{
                    questionNumber: '解析错误',
                    questionContent: '',
                    studentAnswer: '',
                    correctAnswer: '',
                    analysis: 'AI返回的数据格式有问题',
                    suggestion: '请重新拍照，确保照片清晰、光线充足',
                    knowledgePoint: '未知',
                    difficulty: '未知'
                }],
                overallComment: '建议重新拍一张更清晰的照片！',
                strengths: [],
                weaknesses: ['图片质量可能不够清晰'],
                studyTips: ['确保照片清晰、光线充足', '避免反光和阴影'],
                timestamp: Date.now()
            };
        }

    } catch (error) {
        clearTimeout(timeoutId);

        if (error.name === 'AbortError') {
            throw new Error('请求超时，请检查网络连接');
        }
        throw error;
    }
};

/**
 * 生成家长报告
 */
exports.generateParentReport = async (analysisData, studentName, apiKey) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    try {
        const accuracy = analysisData.totalQuestions > 0
            ? Math.round((analysisData.correctCount / analysisData.totalQuestions) * 100)
            : 0;

        const response = await fetch(QWEN_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'qwen-plus',
                input: {
                    messages: [{
                        role: 'user',
                        content: `你是一位经验丰富的教育专家，需要为家长生成一份专业的学情分析报告。

学生姓名：${studentName}
作业完成情况：
- 总题数：${analysisData.totalQuestions}
- 正确数：${analysisData.correctCount}
- 正确率：${accuracy}%

错题详情：
${analysisData.errors.map((e, i) => `${i + 1}. ${e.questionNumber}：${e.analysis}`).join('\n')}

优势：${analysisData.strengths?.join('、') || '暂无'}
需要加强：${analysisData.weaknesses?.join('、') || '暂无'}

请生成一份专业的家长报告，包含以下内容（JSON格式）：

{
  "title": "学情分析报告",
  "summary": "简短总结（2-3句话）",
  "performanceLevel": "优秀/良好/一般/需加强",
  "strengthsAnalysis": "优势分析（100字左右）",
  "weaknessesAnalysis": "薄弱点分析（100字左右）",
  "recommendedActions": [
    "具体建议1",
    "具体建议2",
    "具体建议3"
  ],
  "parentGuidance": "家长如何配合辅导（150字左右）",
  "encouragement": "给孩子的鼓励话语"
}

要求：
1. 语言专业但易懂，适合家长阅读
2. 分析要客观、建议要具体
3. 多鼓励、少批评
4. 只返回JSON，不要其他文字`
                    }]
                }
            }),
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(getErrorMessage(response.status, errorText));
        }

        const data = await response.json();
        let textContent = data.output.choices[0].message.content;

        // 清理markdown
        textContent = textContent
            .replace(/```json\n?/g, '')
            .replace(/```\n?/g, '')
            .trim();

        try {
            const result = JSON.parse(textContent);
            result.timestamp = Date.now();
            result.studentName = studentName;
            result.accuracy = accuracy;
            result.totalQuestions = analysisData.totalQuestions;
            result.correctCount = analysisData.correctCount;
            return result;
        } catch (parseError) {
            // 如果解析失败，返回基础报告
            return {
                title: '学情分析报告',
                summary: `${studentName}本次作业完成率${accuracy}%，总体表现${accuracy >= 80 ? '优秀' : accuracy >= 60 ? '良好' : '需加强'}。`,
                performanceLevel: accuracy >= 80 ? '优秀' : accuracy >= 60 ? '良好' : '需加强',
                strengthsAnalysis: analysisData.strengths?.join('，') || '需要更多观察',
                weaknessesAnalysis: analysisData.weaknesses?.join('，') || '需要更多观察',
                recommendedActions: analysisData.studyTips || ['多加练习', '及时复习', '培养良好学习习惯'],
                parentGuidance: '建议家长每天陪伴孩子完成作业，及时发现问题，耐心引导孩子思考。',
                encouragement: '继续加油！每一次进步都值得鼓励！',
                timestamp: Date.now(),
                studentName: studentName,
                accuracy: accuracy,
                totalQuestions: analysisData.totalQuestions,
                correctCount: analysisData.correctCount
            };
        }

    } catch (error) {
        clearTimeout(timeoutId);

        if (error.name === 'AbortError') {
            throw new Error('生成报告超时');
        }
        throw error;
    }
};

/**
 * 获取友好的错误消息
 */
function getErrorMessage(status, errorText) {
    switch (status) {
        case 401:
            return 'API Key 无效，请检查是否正确';
        case 429:
            return 'API调用次数超限，请稍后再试';
        case 400:
            return '请求参数错误，请确保图片格式正确';
        default:
            return `API请求失败 (${status}): ${errorText.substring(0, 200)}`;
    }
}
