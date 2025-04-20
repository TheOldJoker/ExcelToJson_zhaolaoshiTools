import React, { useState } from 'react';
import Header from './components/Header';
import FileUploader from './components/FileUploader';
import JsonPreview from './components/JsonPreview';
import { excelToJson } from './utils/excelUtils';

function App() {
  const [jsonData, setJsonData] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState(null);

  const handleFileSelect = async (file) => {
    setIsLoading(true);
    setError(null);
    setFileName(file.name);
    
    try {
      const result = await excelToJson(file);
      setJsonData(result);
    } catch (err) {
      setError(err.message);
      setJsonData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto p-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold text-center mb-6">Excel 到 JSON 转换器</h1>
            <p className="text-gray-600 text-center mb-8">
              上传Excel文件（.xlsx或.xls），将其转换为JSON格式，并下载转换后的文件。
            </p>
            
            <FileUploader 
              onFileSelect={handleFileSelect} 
              isLoading={isLoading} 
            />
            
            {error && (
              <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
                <p className="font-medium">处理错误</p>
                <p>{error}</p>
              </div>
            )}
            
            {isLoading && (
              <div className="mt-6 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-2 text-gray-600">正在处理Excel文件...</p>
              </div>
            )}
          </div>
          
          {jsonData && !isLoading && (
            <JsonPreview 
              jsonData={jsonData} 
              fileName={fileName} 
            />
          )}
          
          <div className="mt-8 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} Excel转JSON工具 | 使用React和SheetJS构建</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App; 