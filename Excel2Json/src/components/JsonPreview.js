import React, { useState } from 'react';
import { downloadJson } from '../utils/excelUtils';

const JsonPreview = ({ jsonData, fileName }) => {
  const [activeSheet, setActiveSheet] = useState(
    jsonData && jsonData.sheets ? jsonData.sheets[0] : null
  );
  const [showFullJson, setShowFullJson] = useState(false);
  
  if (!jsonData || !jsonData.data || Object.keys(jsonData.data).length === 0) {
    return null;
  }
  
  const baseFileName = fileName ? fileName.replace(/\.(xlsx|xls)$/i, '') : 'excel_data';
  
  const handleDownload = () => {
    if (activeSheet) {
      // 下载当前活动工作表的数据
      downloadJson(jsonData.data[activeSheet], `${baseFileName}_${activeSheet}`);
    } else {
      // 下载所有数据
      downloadJson(jsonData.data, baseFileName);
    }
  };
  
  const handleDownloadAll = () => {
    // 下载所有工作表数据
    downloadJson(jsonData.data, baseFileName);
  };
  
  // 格式化要显示的JSON
  const getDisplayJson = () => {
    if (!activeSheet) return JSON.stringify(jsonData.data, null, 2);
    
    const sheetData = jsonData.data[activeSheet];
    
    // 如果不展示全部，只展示前5条记录
    if (!showFullJson && sheetData.length > 5) {
      return JSON.stringify(sheetData.slice(0, 5), null, 2) + 
        `\n\n// ... 还有 ${sheetData.length - 5} 条记录 ...`;
    }
    
    return JSON.stringify(sheetData, null, 2);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mt-6">
      <h2 className="text-xl font-bold mb-4">JSON预览</h2>
      
      {/* 工作表选择 */}
      {jsonData.sheets && jsonData.sheets.length > 1 && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            选择工作表：
          </label>
          <div className="flex flex-wrap gap-2">
            {jsonData.sheets.map(sheet => (
              <button
                key={sheet}
                onClick={() => setActiveSheet(sheet)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  activeSheet === sheet
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {sheet}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* JSON显示 */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">
            {activeSheet ? `"${activeSheet}"工作表数据` : '所有数据'}
          </h3>
          
          <button
            onClick={() => setShowFullJson(!showFullJson)}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            {showFullJson ? '只显示部分' : '显示全部'}
          </button>
        </div>
        
        <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-auto max-h-96 text-sm">
          {getDisplayJson()}
        </pre>
      </div>
      
      {/* 下载按钮 */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          {activeSheet 
            ? `下载 "${activeSheet}" 工作表` 
            : '下载JSON文件'}
        </button>
        
        {activeSheet && jsonData.sheets.length > 1 && (
          <button
            onClick={handleDownloadAll}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            下载所有工作表
          </button>
        )}
      </div>
    </div>
  );
};

export default JsonPreview; 