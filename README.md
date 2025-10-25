# 作业辅导AI助手

一个基于通义千问多模态大模型的作业辅导工具。

## 功能特点

- 📸 拍照上传作业
- 🤖 AI自动识别错题
- 💡 给出改进建议
- 📊 统计正确率

## 如何使用

1. 访问网站
2. 输入通义千问 API Key
3. 上传作业照片
4. 等待AI分析
5. 查看反馈结果

## 技术栈

- 前端：原生 HTML/CSS/JavaScript
- 后端：Vercel Serverless Functions
- AI：阿里云通义千问 (qwen-vl-plus)

## 部署到 Vercel

1. Fork 这个仓库
2. 在 Vercel 导入项目
3. 点击部署
4. 完成！

## 本地开发

```bash
# 安装 Vercel CLI
npm i -g vercel

# 本地运行
vercel dev
```

## 注意事项

- 需要自己申请通义千问 API Key
- API Key 保存在浏览器本地，不会上传
- 图片数据通过后端转发，不会保存

## License

MIT
