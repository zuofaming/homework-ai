const qwenService = require('../services/qwenService');

/**
 * 生成家长报告
 */
exports.generateReport = async (req, res) => {
    try {
        const { analysisData, studentName, apiKey } = req.body;

        // 验证输入
        if (!analysisData) {
            return res.status(400).json({
                success: false,
                error: '缺少分析数据'
            });
        }

        if (!apiKey && !process.env.QWEN_API_KEY) {
            return res.status(400).json({
                success: false,
                error: '缺少 API Key'
            });
        }

        // 生成家长报告
        const report = await qwenService.generateParentReport(
            analysisData,
            studentName || '您的孩子',
            apiKey || process.env.QWEN_API_KEY
        );

        res.json({
            success: true,
            data: report
        });

    } catch (error) {
        console.error('生成报告错误:', error);
        res.status(500).json({
            success: false,
            error: error.message || '生成报告失败'
        });
    }
};
