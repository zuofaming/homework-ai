import React from 'react';
import './ApiKeyInput.css';

function ApiKeyInput({ value, onChange }) {
  return (
    <div className="api-key-section">
      <h3>⚙️ API密钥设置</h3>
      <input
        type="password"
        className="api-key-input"
        placeholder="请输入通义千问 API Key"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="api-key-hint">
        💡 <strong>获取方式：</strong>
        访问 <a href="https://dashscope.aliyun.com/" target="_blank" rel="noopener noreferrer">
          dashscope.aliyun.com
        </a> 注册并创建API Key
      </div>
    </div>
  );
}

export default ApiKeyInput;
