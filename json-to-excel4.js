import { BusOptionsMapping } from "./exportSettingConfig.js";
import Utils from "./Utils.js";

/**
 * Configuration object for JSON to Excel conversion
 * Contains all the settings for processing incident data
 */

const PRESET_FIELDS = [
  {
    title: "Initial Report",
    fieldNames: [
      "startTime",
      "endTime",
      "incidentTypeName",
      "incidentSubTypeName",
      "natureofIncident",
      "incidentDescription",
      "ptoIncidentLevel",
      "ltaIncidentLevel",
      "isEscalatedToMOT",
    ],
  },
  {
    title: "Bus Service Information",
    fieldNames: [
      "busNumberInfoList.busServiceNumber",
      "busNumberInfoList.busContractNumber",
    ],
  },
  {
    title: "Location Information",
    fieldNames: [
      "startLocation",
      "startLocationLongitude",
      "startLocationLatitude",
      "endLocation",
      "locationTypeName",
      "locationSubTypeName",
      "locationDescription",
    ],
  },
  {
    title: "Detailed Description",
    fieldNames: [
      "mediaAtScene",
      "numberOfFatalities",
      "numberOfInjured",
      "additionalInformation",
    ],
  },
  {
    title: "Involved Person(s) Information",
    fieldNames: [
      "personsInfoList.involvedPersonName",
      "personsInfoList.raceName",
      "personsInfoList.age",
      "personsInfoList.ageRange",
      "personsInfoList.gender",
      "personsInfoList.injuredPerson",
      "personsInfoList.hospitalInfo.hospitalConveryedName",
      "personsInfoList.hospitalInfo.stateOfConveryedPerson",
      "personsInfoList.hospitalInfo.extentOfInjury",
    ],
  },
  {
    title: "Agency Activated Information",
    fieldNames: [
      "agencyInfoList.activatedTime",
      "agencyInfoList.agencyTypeName",
      "agencyInfoList.otherAgencyType",
    ],
  },
  {
    title: "Service Information",
    fieldNames: [
      "numberOfBuses",
      "busServiceInfoList.busServiceNumber",
      "busServiceInfoList.busRegisterationNumber",
      "busServiceInfoList.enroute",
      "busServiceInfoList.numberOfPassengerOnBoard",
      "busServiceInfoList.numberOfPassengerTransferred",
      "busServiceInfoList.reasonForNonInsurancOfComplimentaryTicket",
      "busServiceInfoList.numberOfComplimentaryTicketIssued",
      "busServiceInfoList.svcResumptionTime",
      "busServiceInfoList.svcResumptionLocation",
      "busServiceInfoList.replacemetBusRegistrationNumber",
      "busServiceInfoList.busImpounded",
      "busServiceInfoList.damageDescription",
    ],
  },
  {
    title: "Bus Caption Information",
    fieldNames: [
      "busServiceInfoList.captainName",
      "busServiceInfoList.age",
      "busServiceInfoList.employeeId",
      "busServiceInfoList.lengthOfServiceYear",
      "busServiceInfoList.lengthOfServiceMonth",
      "busServiceInfoList.nationality",
    ],
  },
  {
    title: "Route Amendment",
    fieldNames: [
      "routeAmendmentList.originalRoute",
      "routeAmendmentList.routeTakenList.routeTaken",
      "routeAmendmentList.routeTakenList.ltaApprovedRoute",
      "routeAmendmentList.routeTakenList.busServiceInfoList.busServiceNumber",
      "routeAmendmentList.routeTakenList.busServiceInfoList.busRegisterationNumber",
      "routeAmendmentList.routeTakenList.busServiceInfoList.numberOfSkippedBusStop",
      "routeAmendmentList.routeTakenList.busServiceInfoList.startSkippedBusStop",
      "routeAmendmentList.routeTakenList.busServiceInfoList.endSkippedBusStop",
    ],
  },
  {
    title: "Claims Verification",
    fieldNames: [
      "claimsVerificationInfoList.busServiceNumber",
      "claimsVerificationInfoList.busRegisterationInfoList.busRegisterationNumber",
      "claimsVerificationInfoList.busRegisterationInfoList.numberOfAffectedTrip",
    ],
  },
  {
    title: "For LTA Internal Use",
    fieldNames: [
      "cmtActivated",
      "cmtActivationTime",
      "eocActivated",
      "eocActivationTime",
      "greenWaveActivated",
      "ltaRemarks",
    ],
  },
  {
    title: "Report Details",
    fieldNames: [
      "createdBy",
      "createdTime",
      "lastModifiedBy",
      "lastModifiedTime",
    ],
  },
];

const CONFIG = {
  inputFile: "input4.json",
  outputJsonFile: "output4.json",
  outputExcelFile: "output4.xlsx",
  worksheetName: "Report",

  // Define the fields to extract from the JSON data in the desired order
  fields: PRESET_FIELDS.flatMap((group) => group.fieldNames),
  /**
   * Context rules for intelligent deduplication
   * Each rule defines how to uniquely identify entities within an incident
   * - Vehicles are identified by their plate number serial
   * - Personnel are identified by their name
   */
  contextRules: {
    personsInfoList: "involvedPersonName",
    "personsInfoList.hospitalInfo": "hospitalConveryedName",
    busServiceInfoList: "busServiceNumber",
    claimsVerificationInfoList: "busServiceNumber",
  },
};

/**
 * Safely retrieves a value from an object using a dot-notation path
 * @param {Object} obj - The object to traverse
 * @param {string} fieldPath - Dot-notation path (e.g., "location.road")
 * @returns {*} The value at the specified path, or undefined if not found
 */
function getValueByPath(obj, fieldPath) {
  const parts = fieldPath.split(".");
  let value = obj;
  for (const part of parts) {
    value = value && value[part];
  }
  return value;
}

/**
 * Generates a unique context key for deduplication
 * This ensures that duplicate values are only hidden within the same context
 * (e.g., same vehicle, same person) and scoped within the same incident
 *
 * @param {string} field - The field being processed
 * @param {Object} obj - Current object being processed
 * @param {Object} contextRules - Rules defining how to identify unique contexts
 * @param {string} incidentId - Current incident ID for scoping
 * @param {Object} arrayContext - Object containing array indices for unique identification
 * @returns {string} Unique context key for deduplication
 */
function generateContextKey(
  field,
  obj,
  contextRules,
  incidentId,
  arrayContext = {}
) {
  let contextKey = `${incidentId}:${field}`;

  // Check if this field matches any defined context rule
  for (const [category, contextField] of Object.entries(contextRules)) {
    if (field.includes(`${category}.`) || field.startsWith(category + ".")) {
      // Handle full path matches (e.g., "details.vehiclesInvolved")
      if (category.includes(".") && field.startsWith(category + ".")) {
        const basePath = category;
        const fullContextPath = `${basePath}.${contextField}`;
        const contextValue = getValueByPath(obj, fullContextPath);

        // Include array context to make each array item unique
        const arrayIndex =
          arrayContext[category.split(".")[0]] || arrayContext[category] || "";
        contextKey = `${incidentId}:${field}:${contextValue}:${arrayIndex}`;
        break;
      }
      // Handle simple category matches (e.g., "personsInfoList")
      else if (!category.includes(".") && field.includes(`${category}.`)) {
        const contextFieldPath = field.replace(/\.[^.]+$/, `.${contextField}`);
        const contextValue = getValueByPath(obj, contextFieldPath);

        // Include array context to make each array item unique
        const arrayIndex = arrayContext[category] || "";
        contextKey = `${incidentId}:${field}:${contextValue}:${arrayIndex}`;
        break;
      }
    }
  }

  return contextKey;
}

/**
 * Flattens nested JSON data into rows with intelligent deduplication
 * This function recursively processes arrays and applies context-aware deduplication
 * to prevent duplicate values from appearing within the same entity context
 *
 * @param {Object} obj - The JSON object to flatten
 * @param {Object} config - Configuration object containing fields and rules
 * @param {string} parentKey - Key to identify parent entity (default: "id")
 * @returns {Array} Array of flattened row objects
 */
function flattenAndDedup(obj, parentKey, fields, contextRules) {
  let seen = {}; // Tracks seen values per context to enable deduplication

  function recurse(o, parent = {}, parentValue = null, arrayContext = {}) {
    // Initialize deduplication tracking for each new parent (incident)
    if (parentValue === null && o[parentKey]) {
      seen = {};
      parentValue = o[parentKey];
    }

    // Look for arrays in the data structure that need to be flattened
    for (const field of fields) {
      const parts = field.split(".");
      let ref = o;
      let arrIdx = -1;

      // Navigate to find the first array in the field path
      for (let j = 0; j < parts.length; j++) {
        if (Array.isArray(ref)) {
          arrIdx = j;
          break;
        }
        ref = ref ? ref[parts[j]] : undefined;
      }

      // If we found an array, flatten it by processing each item
      if (Array.isArray(ref)) {
        return ref.flatMap((item, index) => {
          let newObj = o;
          let target = newObj;

          // Navigate to the parent of the array
          for (let k = 0; k < arrIdx - 1; k++) {
            target = target[parts[k]];
          }

          // Replace the array with the current item
          if (arrIdx > 0) {
            target[parts[arrIdx - 1]] = item;
          } else {
            newObj = item;
          }

          // Create array context with the array name and index to make each array item unique
          const arrayName = parts[arrIdx - 1] || parts[0];
          const newArrayContext = {
            ...arrayContext,
            [arrayName]: index,
          };

          // Recursively process the modified object
          return recurse(newObj, parent, parentValue, newArrayContext);
        });
      }
    } // No more arrays found - create a data row with deduplication applied
    const row = { ...parent };

    // Handle ID field with deduplication
    if (parentValue) {
      const idContextKey = `${parentValue}:${parentKey}`;
      if (!seen[idContextKey]) {
        seen[idContextKey] = new Set();
      }

      const shouldDedupId = seen[idContextKey].has(parentValue);
      row[parentKey] = shouldDedupId ? "" : parentValue;

      if (!seen[idContextKey].has(parentValue)) {
        seen[idContextKey].add(parentValue);
      }
    }

    for (const field of fields) {
      const parts = field.split(".");
      let value = o;

      // Extract the value for this field
      for (const part of parts) {
        value = value && value[part];
      }

      // Convert arrays to comma-separated strings
      if (Array.isArray(value)) {
        value = value.join(", ");
      } // Generate context-aware key for intelligent deduplication
      const contextKey = generateContextKey(
        field,
        o,
        contextRules,
        parentValue,
        arrayContext
      );

      // Initialize tracking for this context if not seen before
      if (!seen[contextKey]) {
        seen[contextKey] = new Set();
      } // Apply deduplication: show value if not seen in this context, otherwise empty string
      const shouldDedup = value && seen[contextKey].has(value);
      row[field] = shouldDedup ? "" : value ?? "";

      // Track this value for future deduplication
      if (value && !seen[contextKey].has(value)) {
        seen[contextKey].add(value);
      }
    }

    return [row];
  }

  return recurse(obj);
}

/**
 * Merges compatible rows to reduce output size
 * Combines rows where fields don't overlap (one row has empty values where another has data)
 * This helps create more compact output while preserving all information
 *
 * @param {Array} rows - Array of row objects to potentially merge
 * @param {Object} config - Configuration object
 * @param {string} parentKey - Key to identify parent entity (default: "id")
 * @param {string} noParentKey - Key for items without parent (default: "__NO_PARENT__")
 * @returns {Array} Array of merged row objects
 */
function mergeRowsByParent(
  rows,
  fields,
  parentKey = "id",
  noParentKey = "__NO_PARENT__"
) {
  // Group rows by their parent key (incident ID)
  const grouped = rows.reduce((acc, row) => {
    const key = row[parentKey] || noParentKey;
    (acc[key] = acc[key] || []).push(row);
    return acc;
  }, {});

  // Process each group to merge compatible rows
  return Object.values(grouped).flatMap((groupRows) => {
    const used = Array(groupRows.length).fill(false);
    const merged = [];

    for (let i = 0; i < groupRows.length; i++) {
      if (used[i]) continue;

      let row = { ...groupRows[i] };
      used[i] = true;

      // Try to merge with other unused rows in the same group
      for (let j = i + 1; j < groupRows.length; j++) {
        if (used[j]) continue;

        // Check if rows can be merged (no conflicting non-empty values)
        if (fields.every((f) => !row[f] || !groupRows[j][f])) {
          // Merge the rows by filling empty fields
          for (const f of fields) {
            if (!row[f]) {
              row[f] = groupRows[j][f];
            }
          }
          used[j] = true;
        }
      }

      merged.push(row);
    }

    return merged;
  });
}

/**
 * Adds blank rows between different incidents for better visual separation
 * @param {Array} allRows - Array of processed row objects
 * @param {Object} config - Configuration object
 * @param {string} parentKey - Key to identify parent entity (default: "id")
 * @returns {Array} Array of row objects with blank separators
 */
function addBlankRowsBetweenIncidents(allRows, fields, parentKey) {
  if (allRows.length === 0) return allRows;

  const result = [];
  let previousIncidentId = null;

  for (let i = 0; i < allRows.length; i++) {
    const currentIncidentId = allRows[i][parentKey];

    // Add blank row before new incident (except for the first incident)
    if (
      previousIncidentId !== null &&
      currentIncidentId !== previousIncidentId &&
      currentIncidentId
    ) {
      // Create blank row with empty values for all fields
      const blankRow = {};
      fields.forEach((field) => {
        blankRow[field] = "";
      });
      result.push(blankRow);
    }

    result.push(allRows[i]);

    if (currentIncidentId) {
      previousIncidentId = currentIncidentId;
    }
  }

  return result;
}

//FieldLabelMap

function getFieldLabelMap(optionsMapping) {
  const map = {};
  Object.values(optionsMapping)
    .flat()
    .forEach((opt) => {
      map[opt.value] = opt.label;
    });
  return map;
}

//Group Header
function getGroupHeaderRow(presetFields) {
  const row = [];
  for (const group of presetFields) {
    for (let i = 0; i < group.fieldNames.length; i++) {
      row.push(i === 0 ? group.title : "");
    }
  }
  return row;
}

/**
 * Main processing function that orchestrates the entire conversion process
 * Reads JSON input, processes it through flattening and merging, then outputs to both JSON and Excel
 *
 * @param {Object} config - Configuration object (defaults to CONFIG)
 * @param {string} parentKey - Key to identify parent entity (default: "id")
 * @param {string} noParentKey - Key for items without parent (default: "__NO_PARENT__")
 * @returns {Array} The processed data as a 2D array
 */
function processData(config) {
  try {
    const inputData = Utils.readJsonFile(config.inputFile);

    const parentKey = "id";
    // Process each incident through flattening and merging
    let allRows = inputData.flatMap((item) =>
      mergeRowsByParent(
        flattenAndDedup(item, parentKey, config.fields, config.contextRules),
        config.fields,
        parentKey
      )
    );

    const EXPORT_FIELDS = [parentKey, ...config.fields];
    // Add blank rows between incidents for better visual separation
    allRows = addBlankRowsBetweenIncidents(allRows, EXPORT_FIELDS, parentKey);

    // --- Add group header row ---
    const groupHeaderRow = ["Id", ...getGroupHeaderRow(PRESET_FIELDS)];
    // ---

    // --- Add label header row ---
    const fieldLabelMap = getFieldLabelMap(BusOptionsMapping);
    const labelHeaderRow = [
      " ",
      ...config.fields.map((f) => fieldLabelMap[f] || f),
    ];
    // ---

    // Convert to 2D array format with headers
    const rows = [
      groupHeaderRow,
      labelHeaderRow,
      ...allRows.map((row) => EXPORT_FIELDS.map((f) => row[f] ?? "")), // Data rows
    ];

    // Output to both JSON and Excel formats
    console.log(`✅ Writing JSON output: ${config.outputJsonFile}`);
    Utils.writeJsonFile(config.outputJsonFile, rows);
    console.log(`⌛ Writing Excel output: ${config.outputExcelFile}`);
    Utils.writeExcelFile(config.outputExcelFile, rows, config.worksheetName);

    return rows;
  } catch (error) {
    console.error("Error processing data:", error.message);
    throw error;
  }
}

// Execute the main processing function
processData(CONFIG);
