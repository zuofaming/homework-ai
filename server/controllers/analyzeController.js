const qwenService = require('../services/qwenService');

/**
 * 分析作业
 */
exports.analyzeHomework = async (req, res) => {
    try {
        const { imageData, apiKey } = req.body;

        // 验证输入
        if (!imageData) {
            return res.status(400).json({
                success: false,
                error: '缺少图片数据'
            });
        }

        if (!apiKey && !process.env.QWEN_API_KEY) {
            return res.status(400).json({
                success: false,
                error: '缺少 API Key'
            });
        }

        // 验证图片格式
        if (!imageData.startsWith('data:image/')) {
            return res.status(400).json({
                success: false,
                error: '图片格式不正确'
            });
        }

        // 调用通义千问API分析
        const result = await qwenService.analyzeImage(
            imageData,
            apiKey || process.env.QWEN_API_KEY
        );

        // 返回结果
        res.json({
            success: true,
            data: result
        });

    } catch (error) {
        console.error('分析作业错误:', error);
        res.status(500).json({
            success: false,
            error: error.message || '分析失败，请稍后重试'
        });
    }
};
