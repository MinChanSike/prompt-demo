export default fileUtils;
declare namespace fileUtils {
    function readJsonFile(filename: any): any;
    function writeJsonFile(filename: any, data: any): void;
    function writeExcelFile(filename: any, data: any, worksheetName: any): void;
}
