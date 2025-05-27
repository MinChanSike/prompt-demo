# JSON to Excel Converter - TypeScript Version

This project converts nested JSON incident data to Excel format with intelligent deduplication and formatting capabilities.

## About

This project was generated and developed with assistance from **GitHub Copilot** powered by **Claude Sonnet 4**. The AI assistant helped with:

- TypeScript conversion and type definitions
- Code refactoring and optimization
- Documentation and best practices
- Development workflow setup
- Testing and validation

## Files

- `json-to-excel3.ts` - TypeScript version with full type safety
- `json-to-excel3.js` - Original JavaScript version
- `Utils.js` - Utility functions for file I/O and Excel operations
- `tsconfig.json` - TypeScript configuration
- `input3.json` - Sample input data

## Features

- **Type Safety**: Full TypeScript support with comprehensive type definitions
- **Intelligent Deduplication**: Context-aware deduplication based on vehicle plate numbers and personnel names
- **Flexible Formatting**: Configurable formatter functions for data transformation
- **Blank Row Separation**: Automatic blank rows between different incidents for better readability
- **Multiple Output Formats**: Generates both JSON and Excel (.xlsx) files

## Installation

```bash
npm install
```

## Scripts

### Development (TypeScript)

```bash
# Run TypeScript version directly with tsx
npm run start:ts

# Run in watch mode for development
npm run dev
```

### Production (Compiled JavaScript)

```bash
# Compile TypeScript to JavaScript
npm run build

# Compile and run the JavaScript version
npm run build:run

# Run only the compiled version
node dist/json-to-excel3.js
```

### Legacy JavaScript

```bash
# Run the original JavaScript version
npm start
```

### Utilities

```bash
# Clean output files
npm run clean
```

## Configuration

The converter is configured through the `CONFIG` object in `json-to-excel3.ts`:

```typescript
const CONFIG: Config = {
  inputFile: "input3.json",
  outputJsonFile: "output3.json",
  outputExcelFile: "output3.xlsx",
  worksheetName: "Report",
  parentKey: "incidentId",
  noParentKey: "__NO_PARENT__",
  fields: [...], // Field extraction order
  contextRules: {...}, // Deduplication rules
  formatters: {...} // Value formatting functions
};
```

## Type Definitions

The TypeScript version includes comprehensive type definitions for:

- `Incident` - Main incident data structure
- `Vehicle`, `Personnel`, `Responder` - Entity types
- `Config` - Configuration object
- `FormatterFunction` - Function signature for value formatters
- `Row` - Processed row data

## Formatter Functions

Built-in formatters include:

- `timeFormatter` - Converts ISO timestamps to readable format
- `plateNumberFormatter` - Converts plate numbers to uppercase
- `nameFormatter` - Formats names to proper case
- `casualtiesFormatter` - Adds descriptive text for casualty counts

## Example Usage

```typescript
import { processData, CONFIG } from "./json-to-excel3.js";

// Use default configuration
const result = processData();

// Use custom configuration
const customConfig = {
  ...CONFIG,
  inputFile: "custom-input.json",
  outputExcelFile: "custom-output.xlsx",
};
const customResult = processData(customConfig);
```

## Output

The converter generates:

1. `output3.json` - Intermediate JSON array format
2. `output3.xlsx` - Final Excel file with formatting and blank row separators

## Development

### TypeScript Development

- Use `npm run dev` for watch mode development
- TypeScript provides compile-time type checking
- Full IntelliSense support in VS Code

### Adding New Formatters

```typescript
function customFormatter(value: any): string {
  // Custom formatting logic
  return formattedValue;
}

// Add to CONFIG.formatters
formatters: {
  "field.path": customFormatter,
  // ...other formatters
}
```

### Adding New Types

Extend the existing interfaces in the type definitions section:

```typescript
interface CustomField {
  // Define new field structure
}

interface Incident {
  // ...existing fields...
  customField?: CustomField;
}
```

## AI Development Credits

This project demonstrates the capabilities of AI-assisted development using GitHub Copilot with Claude Sonnet 4. The AI assistant provided:

- **Code Generation**: Automated creation of TypeScript interfaces and function implementations
- **Type Safety**: Comprehensive type definitions for complex nested data structures
- **Best Practices**: Modern TypeScript patterns and development workflows
- **Documentation**: Auto-generated JSDoc comments and README documentation
- **Testing**: Validation of functionality and error handling
- **Optimization**: Performance improvements and code refactoring suggestions

The collaboration between human developer requirements and AI capabilities resulted in a robust, type-safe solution for complex JSON-to-Excel data transformation.
