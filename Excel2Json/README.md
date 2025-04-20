# Excel转JSON工具

一个简单易用的Web应用程序，用于将Excel文件（.xlsx或.xls）转换为JSON格式。

## 功能特点

- 拖放式文件上传界面
- 支持多工作表Excel文件
- 实时预览转换后的JSON数据
- 可选择下载单个工作表或整个文件的JSON数据
- 响应式设计，适配各种设备屏幕

## 技术栈

- React 18
- SheetJS (xlsx) - 用于Excel解析
- TailwindCSS - 用于UI设计
- 使用Create React App构建

## 如何使用

1. 克隆该存储库
2. 安装依赖
   ```
   npm install
   ```
3. 运行开发服务器
   ```
   npm start
   ```
4. 构建生产版本
   ```
   npm run build
   ```

## 使用方法

1. 点击上传按钮或将Excel文件拖放到指定区域
2. 应用程序会自动解析Excel文件并显示JSON预览
3. 对于多工作表文件，可以在各工作表之间切换
4. 点击下载按钮保存JSON文件

## 许可证

MIT 