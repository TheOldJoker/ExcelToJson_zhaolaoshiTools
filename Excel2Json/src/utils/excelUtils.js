import * as XLSX from 'xlsx';

/**
 * 将Excel文件转换为JSON数据
 * @param {File} file - Excel文件
 * @returns {Promise} - 返回包含JSON数据和工作表名称的Promise
 */
export const excelToJson = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // 所有工作表的数据
        const result = {};
        
        // 处理所有工作表
        workbook.SheetNames.forEach(sheetName => {
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet, { 
            defval: '', // 默认空单元格值
            raw: false  // 以字符串格式返回
          });
          result[sheetName] = json;
        });
        
        resolve({
          data: result,
          sheets: workbook.SheetNames
        });
      } catch (err) {
        reject(new Error('解析Excel文件失败：' + err.message));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('读取文件失败，请重试'));
    };
    
    reader.readAsArrayBuffer(file);
  });
};

/**
 * 验证上传的文件是否为有效的Excel文件
 * @param {File} file - 要验证的文件
 * @returns {boolean} - 返回是否为有效Excel文件
 */
export const isValidExcelFile = (file) => {
  return file && file.name.match(/\.(xlsx|xls)$/i);
};

/**
 * 下载JSON数据为文件
 * @param {Object} data - JSON数据
 * @param {string} fileName - 文件名（不包含扩展名）
 */
export const downloadJson = (data, fileName = 'converted_data') => {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `${fileName}.json`;
  document.body.appendChild(a);
  a.click();
  
  // 清理
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
}; 