import React, { useRef } from 'react';
import { isValidExcelFile } from '../utils/excelUtils';

const FileUploader = ({ onFileSelect, isLoading }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    
    if (!file) return;
    
    if (!isValidExcelFile(file)) {
      alert('请上传有效的Excel文件（.xlsx 或 .xls）');
      // 重置文件输入
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }
    
    onFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      
      if (!isValidExcelFile(file)) {
        alert('请上传有效的Excel文件（.xlsx 或 .xls）');
        return;
      }
      
      onFileSelect(file);
    }
  };

  return (
    <div 
      className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors duration-300"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center">
        <svg 
          className="w-12 h-12 mb-3 text-gray-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        
        <p className="mb-2 text-sm text-gray-500">
          <span className="font-semibold">点击上传</span> 或拖放Excel文件
        </p>
        <p className="text-xs text-gray-500">
          支持的文件格式：.XLSX, .XLS
        </p>

        {isLoading ? (
          <div className="mt-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-sm text-gray-600">处理中...</p>
          </div>
        ) : (
          <button
            onClick={() => fileInputRef.current.click()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300"
            disabled={isLoading}
          >
            选择Excel文件
          </button>
        )}
        
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileChange}
          className="hidden"
          disabled={isLoading}
        />
      </div>
    </div>
  );
};

export default FileUploader; 