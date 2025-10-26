import React, { useState, useRef } from 'react';
import { analyzeHomework } from '../services/api';
import './ImageUpload.css';

function ImageUpload({ apiKey, onAnalyzing, onComplete, onError }) {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    setError('');

    // 验证文件类型
    if (!file.type.match('image/(jpeg|png|jpg)')) {
      setError('只支持 JPG、PNG 格式的图片！');
      return;
    }

    // 验证文件大小 (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setError(`图片大小不能超过 5MB！\n当前大小：${(file.size / 1024 / 1024).toFixed(2)}MB`);
      return;
    }

    // 读取文件
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
    };
    reader.onerror = () => {
      setError('图片读取失败，请重试！');
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!apiKey) {
      setError('请先输入 API Key！');
      return;
    }

    if (!preview) {
      setError('请先上传图片！');
      return;
    }

    try {
      setError('');
      onAnalyzing();

      const response = await analyzeHomework(preview, apiKey);

      if (response.success) {
        onComplete(response.data);
      } else {
        throw new Error(response.error || '分析失败');
      }
    } catch (err) {
      setError(err.message);
      onError();
    }
  };

  const handleReset = () => {
    setPreview(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="upload-container">
      {!preview ? (
        <div
          className={`upload-area ${dragActive ? 'drag-active' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="upload-icon">📸</div>
          <div className="upload-text">点击上传作业照片</div>
          <div className="upload-hint">
            或直接拖拽图片到这里<br />
            支持 JPG、PNG 格式，最大 5MB
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/jpg"
            onChange={handleChange}
            style={{ display: 'none' }}
          />
        </div>
      ) : (
        <div className="preview-container">
          <img src={preview} alt="作业预览" className="preview-image" />
          <div className="action-buttons">
            <button className="btn btn-primary" onClick={handleAnalyze}>
              🔍 开始分析
            </button>
            <button className="btn btn-secondary" onClick={handleReset}>
              🔄 重新上传
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="error-message">{error}</div>
      )}
    </div>
  );
}

export default ImageUpload;
