import Utils from "./Utils.js"; //

const data = Utils.readJsonFile("preferOutput4.json");
Utils.writeExcelFile("preferOutput4.xlsx", data, "Sheet1");
