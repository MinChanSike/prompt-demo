import fs from "fs";
import path from "path";
import * as XLSX from "xlsx";
import ExcelJS from "exceljs";
// Utility functions
const fileUtils = {
    readJsonFile(filename) {
        try {
            const filePath = path.resolve(filename);
            return JSON.parse(fs.readFileSync(filePath, "utf8"));
        }
        catch (error) {
            throw new Error(`Failed to read file ${filename}: ${error.message}`);
        }
    },
    writeJsonFile(filename, data) {
        try {
            fs.writeFileSync(filename, JSON.stringify(data, null, 2));
        }
        catch (error) {
            throw new Error(`Failed to write JSON file ${filename}: ${error.message}`);
        }
    },
    writeExcelFile(filename, data, worksheetName) {
        try {
            // const worksheet = XLSX.utils.aoa_to_sheet(data);
            // const workbook = XLSX.utils.book_new();
            // XLSX.utils.book_append_sheet(workbook, worksheet, worksheetName);
            // XLSX.writeFile(workbook, filename);
            // Use exceljs to write the Excel file
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet(worksheetName);
            worksheet.addRows(data);
            worksheet.getRow(1).font = { bold: true };
            // Auto-size columns
            worksheet.columns.forEach((col) => {
                let maxLen = 12;
                col.eachCell({ includeEmpty: true }, (cell) => {
                    const len = (cell.value || "").toString().length;
                    if (len > maxLen)
                        maxLen = len;
                });
                col.width = maxLen + 2;
            });
            workbook.xlsx.writeFile(filename).then(() => {
                console.log(`✅Excel file written: ${filename}`);
            });
        }
        catch (error) {
            throw new Error(`Failed to write Excel file ${filename}: ${error.message}`);
        }
    },
};
export default fileUtils;
//# sourceMappingURL=Utils.js.map