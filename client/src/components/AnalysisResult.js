import React, { useState } from 'react';
import { generateReport } from '../services/api';
import './AnalysisResult.css';

function AnalysisResult({ data, apiKey, onGenerateReport, onReset }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [studentName, setStudentName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);

  const accuracy = data.totalQuestions > 0
    ? Math.round((data.correctCount / data.totalQuestions) * 100)
    : 0;

  const handleGenerateReport = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await generateReport(data, studentName || '您的孩子', apiKey);

      if (response.success) {
        onGenerateReport(response.data);
      } else {
        throw new Error(response.error || '生成报告失败');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyClass = (difficulty) => {
    if (difficulty === '简单') return 'difficulty-easy';
    if (difficulty === '中等') return 'difficulty-medium';
    return 'difficulty-hard';
  };

  return (
    <div className="result-container">
      <div className="result-header">
        <h2>✅ 分析完成！</h2>
        <p>AI已完成作业分析</p>
      </div>

      {/* 统计数据 */}
      {data.totalQuestions > 0 && (
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{data.totalQuestions}</div>
            <div className="stat-label">总题数</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{data.correctCount}</div>
            <div className="stat-label">做对</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{data.errors.length}</div>
            <div className="stat-label">需改进</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{accuracy}%</div>
            <div className="stat-label">正确率</div>
          </div>
        </div>
      )}

      {/* 学习分析 */}
      {(data.strengths?.length > 0 || data.weaknesses?.length > 0) && (
        <div className="learning-analysis">
          <h3>📊 学习分析</h3>
          <div className="analysis-grid">
            {data.strengths?.length > 0 && (
              <div className="analysis-box strengths">
                <h4>✨ 优势方面</h4>
                <ul>
                  {data.strengths.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {data.weaknesses?.length > 0 && (
              <div className="analysis-box weaknesses">
                <h4>⚠️ 需要加强</h4>
                <ul>
                  {data.weaknesses.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 错题详情 */}
      {data.errors.length > 0 ? (
        <div className="errors-section">
          <h3>📝 错题详情</h3>
          {data.errors.map((error, index) => (
            <div key={index} className="error-card">
              <div className="error-header">
                <span className="error-number">❌ {error.questionNumber}</span>
                {error.difficulty && (
                  <span className={`difficulty-tag ${getDifficultyClass(error.difficulty)}`}>
                    {error.difficulty}
                  </span>
                )}
              </div>

              {error.questionContent && (
                <div className="error-field">
                  <strong>题目：</strong>{error.questionContent}
                </div>
              )}

              {error.studentAnswer && (
                <div className="error-field">
                  <strong>你的答案：</strong>{error.studentAnswer}
                </div>
              )}

              {error.correctAnswer && (
                <div className="error-field correct">
                  <strong>正确答案：</strong>{error.correctAnswer}
                </div>
              )}

              {error.analysis && (
                <div className="error-field">
                  <strong>分析：</strong>{error.analysis}
                </div>
              )}

              {error.knowledgePoint && (
                <div className="knowledge-tag">
                  知识点：{error.knowledgePoint}
                </div>
              )}

              {error.suggestion && (
                <div className="suggestion-box">
                  <div className="suggestion-title">💡 改进建议</div>
                  <div>{error.suggestion}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="no-errors">
          <h3>🎉 太棒了！</h3>
          <p>所有题目都做对了！继续保持！</p>
        </div>
      )}

      {/* 总体评价 */}
      {data.overallComment && (
        <div className="overall-comment">
          <div className="comment-title">👩‍🏫 老师的话</div>
          <div className="comment-text">{data.overallComment}</div>
        </div>
      )}

      {/* 学习建议 */}
      {data.studyTips?.length > 0 && (
        <div className="study-tips">
          <h4>💡 学习建议</h4>
          <ul>
            {data.studyTips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}

      {/* 操作按钮 */}
      <div className="action-section">
        {!showNameInput ? (
          <button
            className="btn btn-success"
            onClick={() => setShowNameInput(true)}
          >
            📄 生成家长报告
          </button>
        ) : (
          <div className="name-input-section">
            <input
              type="text"
              className="name-input"
              placeholder="学生姓名（可选）"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
            />
            <button
              className="btn btn-success"
              onClick={handleGenerateReport}
              disabled={loading}
            >
              {loading ? '生成中...' : '✅ 确认生成'}
            </button>
          </div>
        )}

        <button className="btn btn-secondary" onClick={onReset}>
          📸 分析新作业
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default AnalysisResult;
