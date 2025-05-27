import Utils from "./Utils.js";

/**
 * Formatter function instances
 * These functions handle specific data transformations
 */

/**
 * Formats timestamp values to readable date-time format
 * @param {string} value - ISO timestamp string
 * @returns {string} Formatted date-time string
 */
function timeFormatter(value) {
  if (!value) return value;
  try {
    const date = new Date(value);
    return date.toLocaleString("en-SG", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  } catch (error) {
    return value; // Return original value if parsing fails
  }
}

/**
 * Formats plate number serial to uppercase
 * @param {string} value - Plate number serial
 * @returns {string} Uppercase plate number serial
 */
function plateNumberFormatter(value) {
  return value ? value.toString().toUpperCase() : value;
}

/**
 * Formats personnel names to proper case
 * @param {string} value - Personnel name
 * @returns {string} Properly formatted name
 */
function nameFormatter(value) {
  if (!value) return value;
  return value
    .toString()
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Formats casualties count with descriptive text
 * @param {number} value - Number of casualties
 * @returns {string} Formatted casualties description
 */
function casualtiesFormatter(value) {
  if (value === 0 || value === null || value === undefined) {
    return "No casualties";
  }
  return value.toString();
}

/**
 * Configuration object for JSON to Excel conversion
 * Contains all the settings for processing incident data
 */
const CONFIG = {
  inputFile: "input3.json",
  outputJsonFile: "output3.json",
  outputExcelFile: "output3.xlsx",
  worksheetName: "Report",
  parentKey: "incidentId",
  noParentKey: "__NO_PARENT__",

  // Define the fields to extract from the JSON data in the desired order
  fields: [
    "incidentId",
    "type",
    "time",
    "status",
    "location.road",
    "location.direction",
    "location.landmark",
    "details.vehiclesInvolved.type",
    "details.vehiclesInvolved.plateNumber.serial",
    "details.vehiclesInvolved.plateNumber.region",
    "details.vehiclesInvolved.severity",
    "details.casualties",
    "details.lanesBlocked",
    "advisories.type",
    "advisories.message",
    "responders.agency",
    "responders.arrivalTime",
    "responders.personnel.name",
    "responders.personnel.role",
  ],

  /**
   * Context rules for intelligent deduplication
   * Each rule defines how to uniquely identify entities within an incident
   * - Vehicles are identified by their plate number serial
   * - Personnel are identified by their name
   */
  contextRules: {
    "details.vehiclesInvolved": "plateNumber.serial",
    "responders.personnel": "name",
    advisories: "message",
  },

  /**
   * Formatter configuration for field value transformation
   * Each key is a field path, and the value is a reference to a formatter function
   */
  formatters: {
    time: timeFormatter,
    "responders.arrivalTime": timeFormatter,
    "details.vehiclesInvolved.plateNumber.serial": plateNumberFormatter,
    "responders.personnel.name": nameFormatter,
    "details.casualties": casualtiesFormatter,
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
 * Applies formatting to a field value based on configured formatters
 * @param {string} field - The field path
 * @param {*} value - The value to format
 * @param {Object} formatters - The formatters configuration object
 * @returns {*} The formatted value or original value if no formatter is defined
 */
function applyFormatter(field, value, formatters) {
  if (!formatters || !formatters[field]) {
    return value;
  }

  try {
    return formatters[field](value);
  } catch (error) {
    console.warn(`Formatter error for field '${field}':`, error.message);
    return value; // Return original value if formatter fails
  }
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
 * @returns {string} Unique context key for deduplication
 */
function generateContextKey(field, obj, contextRules, incidentId) {
  let contextKey = `${incidentId}:${field}`;

  // Check if this field matches any defined context rule
  for (const [category, contextField] of Object.entries(contextRules)) {
    if (field.includes(`${category}.`) || field.startsWith(category + ".")) {
      // Handle full path matches (e.g., "details.vehiclesInvolved")
      if (category.includes(".") && field.startsWith(category + ".")) {
        const basePath = category;
        const fullContextPath = `${basePath}.${contextField}`;
        const contextValue = getValueByPath(obj, fullContextPath);
        contextKey = `${incidentId}:${field}:${contextValue}`;
        break;
      }
      // Handle simple category matches (e.g., "personnel")
      else if (!category.includes(".") && field.includes(`${category}.`)) {
        const contextFieldPath = field.replace(/\.[^.]+$/, `.${contextField}`);
        const contextValue = getValueByPath(obj, contextFieldPath);
        contextKey = `${incidentId}:${field}:${contextValue}`;
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
 * @returns {Array} Array of flattened row objects
 */
function flattenAndDedup(obj, config) {
  const { fields, parentKey, contextRules, formatters } = config;
  let seen = {}; // Tracks seen values per context to enable deduplication

  function recurse(o, parent = {}, parentValue = null) {
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
        return ref.flatMap((item) => {
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

          // Recursively process the modified object
          return recurse(newObj, parent, parentValue);
        });
      }
    }

    // No more arrays found - create a data row with deduplication applied
    const row = { ...parent };

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
      }

      // Apply formatter to the value before deduplication check
      value = applyFormatter(field, value, formatters);

      // Generate context-aware key for intelligent deduplication
      const contextKey = generateContextKey(
        field,
        o,
        contextRules,
        parentValue
      );

      // Initialize tracking for this context if not seen before
      if (!seen[contextKey]) {
        seen[contextKey] = new Set();
      }

      // Apply deduplication: show value if not seen in this context, otherwise empty string
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
 * @returns {Array} Array of merged row objects
 */
function mergeRowsByParent(rows, config) {
  const { fields, parentKey, noParentKey } = config;

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
 * @returns {Array} Array of row objects with blank separators
 */
function addBlankRowsBetweenIncidents(allRows, config) {
  const { fields, parentKey } = config;

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

/**
 * Main processing function that orchestrates the entire conversion process
 * Reads JSON input, processes it through flattening and merging, then outputs to both JSON and Excel
 *
 * @param {Object} config - Configuration object (defaults to CONFIG)
 * @returns {Array} The processed data as a 2D array
 */
function processData(config = CONFIG) {
  try {
    console.log(`Reading input file: ${config.inputFile}`);
    const inputData = Utils.readJsonFile(config.inputFile);

    console.log("Processing data...");
    // Process each incident through flattening and merging
    let allRows = inputData.flatMap((item) =>
      mergeRowsByParent(flattenAndDedup(item, config), config)
    );

    // Add blank rows between incidents for better visual separation
    console.log("Adding blank rows between incidents...");
    allRows = addBlankRowsBetweenIncidents(allRows, config);

    // Convert to 2D array format with headers
    const rows = [
      config.fields, // Header row
      ...allRows.map((row) => config.fields.map((f) => row[f] ?? "")), // Data rows
    ];

    // Output to both JSON and Excel formats
    console.log(`✅ Writing JSON output: ${config.outputJsonFile}`);
    Utils.writeJsonFile(config.outputJsonFile, rows);

    console.log(`⌛ Writing Excel output: ${config.outputExcelFile}`);
    Utils.writeExcelFile(config.outputExcelFile, rows, config.worksheetName);

    console.log("Processing completed successfully!");
    return rows;
  } catch (error) {
    console.error("Error processing data:", error.message);
    throw error;
  }
}

// Execute the main processing function
processData();
