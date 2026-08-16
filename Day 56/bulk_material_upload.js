// Day 56: Bulk Study Material Upload Handler using XLSX
const XLSX = require('xlsx');

function parseBulkExcel(filePath) {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    console.log(`Parsed ${sheetData.length} resource records from Excel.`);
    return sheetData;
}

module.exports = { parseBulkExcel };
