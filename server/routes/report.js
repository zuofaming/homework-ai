const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// POST /api/report/generate - 生成家长报告
router.post('/generate', reportController.generateReport);

module.exports = router;
