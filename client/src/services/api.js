import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // 60秒超时
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * 分析作业
 */
export const analyzeHomework = async (imageData, apiKey) => {
  try {
    const response = await api.post('/api/analyze', {
      imageData,
      apiKey
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || error.message || '分析失败，请稍后重试'
    );
  }
};

/**
 * 生成家长报告
 */
export const generateReport = async (analysisData, studentName, apiKey) => {
  try {
    const response = await api.post('/api/report/generate', {
      analysisData,
      studentName,
      apiKey
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || error.message || '生成报告失败'
    );
  }
};

export default api;
