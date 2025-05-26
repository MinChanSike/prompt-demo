import Utils from "./Utils.js"; //

const data = Utils.readJsonFile("preferOutput2.json");
Utils.writeExcelFile("preferOutput2.xlsx", data, "Sheet1");
