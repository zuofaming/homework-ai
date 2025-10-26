const express = require('express');
const router = express.Router();
const analyzeController = require('../controllers/analyzeController');

// POST /api/analyze - 分析作业
router.post('/', analyzeController.analyzeHomework);

module.exports = router;
