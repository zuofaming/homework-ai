import React, { useState } from 'react';
import './App.css';
import ImageUpload from './components/ImageUpload';
import AnalysisResult from './components/AnalysisResult';
import ParentReport from './components/ParentReport';
import ApiKeyInput from './components/ApiKeyInput';

function App() {
  const [step, setStep] = useState('upload'); // upload, analyzing, result, report
  const [analysisData, setAnalysisData] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [apiKey, setApiKey] = useState(localStorage.getItem('qwenApiKey') || '');

  const handleApiKeyChange = (key) => {
    setApiKey(key);
    localStorage.setItem('qwenApiKey', key);
  };

  const handleAnalysisComplete = (data) => {
    setAnalysisData(data);
    setStep('result');
  };

  const handleGenerateReport = (report) => {
    setReportData(report);
    setStep('report');
  };

  const handleReset = () => {
    setStep('upload');
    setAnalysisData(null);
    setReportData(null);
  };

  const handleBackToResult = () => {
    setStep('result');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>📚 作业AI助手</h1>
        <p>拍照识别作业 · 智能错题解析 · 生成家长报告</p>
      </header>

      <main className="App-main">
        <ApiKeyInput value={apiKey} onChange={handleApiKeyChange} />

        {step === 'upload' && (
          <ImageUpload
            apiKey={apiKey}
            onAnalyzing={() => setStep('analyzing')}
            onComplete={handleAnalysisComplete}
            onError={() => setStep('upload')}
          />
        )}

        {step === 'analyzing' && (
          <div className="analyzing-container">
            <div className="spinner"></div>
            <h2>AI正在分析作业中...</h2>
            <p>请稍候，这可能需要10-30秒</p>
          </div>
        )}

        {step === 'result' && analysisData && (
          <AnalysisResult
            data={analysisData}
            apiKey={apiKey}
            onGenerateReport={handleGenerateReport}
            onReset={handleReset}
          />
        )}

        {step === 'report' && reportData && (
          <ParentReport
            data={reportData}
            onBack={handleBackToResult}
            onReset={handleReset}
          />
        )}
      </main>

      <footer className="App-footer">
        <p>Powered by 通义千问 · Made with ❤️</p>
      </footer>
    </div>
  );
}

export default App;
