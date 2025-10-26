import React from 'react';
import './ParentReport.css';

function ParentReport({ data, onBack, onReset }) {
  const handleExport = () => {
    const content = `
${data.title}
生成时间：${new Date(data.timestamp).toLocaleString('zh-CN')}
学生姓名：${data.studentName}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 学习概况
总题数：${data.totalQuestions}
正确数：${data.correctCount}
正确率：${data.accuracy}%
表现等级：${data.performanceLevel}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 总结
${data.summary}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✨ 优势分析
${data.strengthsAnalysis}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ 薄弱点分析
${data.weaknessesAnalysis}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 改进建议
${data.recommendedActions.map((action, index) => `${index + 1}. ${action}`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👨‍👩‍👧 家长指导
${data.parentGuidance}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💪 鼓励寄语
${data.encouragement}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

本报告由AI生成，仅供参考
    `.trim();

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `学情报告_${data.studentName}_${new Date().toLocaleDateString('zh-CN').replace(/\//g, '-')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getPerformanceClass = (level) => {
    if (level === '优秀') return 'excellent';
    if (level === '良好') return 'good';
    if (level === '一般') return 'average';
    return 'needwork';
  };

  return (
    <div className="report-container">
      <div className="report-header">
        <h2>📄 {data.title}</h2>
        <p className="report-meta">
          学生：{data.studentName} |
          生成时间：{new Date(data.timestamp).toLocaleString('zh-CN')}
        </p>
      </div>

      {/* 学习概况 */}
      <div className="report-section">
        <h3>📊 学习概况</h3>
        <div className="stats-row">
          <div className="stat-item">
            <span className="stat-label">总题数</span>
            <span className="stat-value">{data.totalQuestions}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">正确数</span>
            <span className="stat-value correct">{data.correctCount}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">正确率</span>
            <span className="stat-value">{data.accuracy}%</span>
          </div>
        </div>

        <div className="performance-badge-container">
          <span className="performance-label">表现等级：</span>
          <span className={`performance-badge ${getPerformanceClass(data.performanceLevel)}`}>
            {data.performanceLevel}
          </span>
        </div>
      </div>

      {/* 总结 */}
      <div className="report-section summary">
        <h3>📝 总结</h3>
        <p>{data.summary}</p>
      </div>

      {/* 优势与薄弱点 */}
      <div className="report-section">
        <h3>✨ 优势分析</h3>
        <div className="analysis-text strengths">
          {data.strengthsAnalysis}
        </div>
      </div>

      <div className="report-section">
        <h3>⚠️ 薄弱点分析</h3>
        <div className="analysis-text weaknesses">
          {data.weaknessesAnalysis}
        </div>
      </div>

      {/* 改进建议 */}
      <div className="report-section">
        <h3>💡 改进建议</h3>
        <ul className="recommendations">
          {data.recommendedActions.map((action, index) => (
            <li key={index}>{action}</li>
          ))}
        </ul>
      </div>

      {/* 家长指导 */}
      <div className="report-section guidance">
        <h3>👨‍👩‍👧 家长指导</h3>
        <p>{data.parentGuidance}</p>
      </div>

      {/* 鼓励寄语 */}
      <div className="report-section encouragement">
        <h3>💪 鼓励寄语</h3>
        <p>{data.encouragement}</p>
      </div>

      {/* 操作按钮 */}
      <div className="report-actions">
        <button className="btn btn-success" onClick={handleExport}>
          📥 导出报告
        </button>
        <button className="btn btn-secondary" onClick={onBack}>
          ← 返回分析
        </button>
        <button className="btn btn-secondary" onClick={onReset}>
          📸 分析新作业
        </button>
      </div>

      <div className="report-footer">
        <p>* 本报告由AI生成，仅供参考</p>
      </div>
    </div>
  );
}

export default ParentReport;
