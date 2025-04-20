# ExcelToJson_zhaolaoshiTools
# Excel 转 JSON 工具

一个简单易用的工具，用于将 Excel 文件（.xlsx 或 .xls）快速转换为 JSON 格式数据。

## 项目介绍

该工具提供了一个直观的网页界面，让用户可以轻松上传 Excel 文件并将其转换为 JSON 格式。适用于需要在各种应用程序和系统中使用 Excel 数据的开发人员和数据处理人员。

## 功能特点

- 拖放式文件上传界面，操作简单直观
- 支持多工作表 Excel 文件
- 实时预览转换后的 JSON 数据
- 可选择下载单个工作表或整个文件的 JSON 数据
- 响应式设计，适配各种设备屏幕
- 独立 HTML 版本，无需安装，拷贝即用

## 技术栈

- React 18
- SheetJS (xlsx) - 用于 Excel 解析
- TailwindCSS - 用于 UI 设计
- 使用 Create React App 构建

## 如何使用

### 独立版本

项目提供了一个独立的 HTML 文件版本，可以直接在浏览器中打开使用，无需安装任何依赖：

1. 打开 `Excel2Json/standalone.html` 文件
2. 点击上传按钮或将 Excel 文件拖放到指定区域
3. 查看和下载转换后的 JSON 数据

## 项目结构

```
Excel2Json/
├── public/           # 静态资源
├── src/              # 源代码
├── standalone.html   # 独立版本（无需安装）
├── package.json      # 项目依赖
└── README.md         # 项目说明
```

