/**
 * Main report generator class
 */
export class ReportGenerator {
    constructor(config?: {
        fields: string[];
        parentKey: string;
        inputFile: string;
        outputFile: string;
        worksheetName: string;
    });
    config: {
        fields: string[];
        parentKey: string;
        inputFile: string;
        outputFile: string;
        worksheetName: string;
    };
    flattener: ObjectFlattener;
    merger: RowMerger;
    generateReport(): Promise<{
        totalProcessed: any;
        outputRows: any;
        outputFile: string;
    }>;
    loadData(): any;
    processData(data: any): any[];
    filterEmptyRows(rows: any): any;
    exportToExcel(rows: any): void;
}
export namespace CONFIG {
    let fields: string[];
    let parentKey: string;
    let inputFile: string;
    let outputFile: string;
    let worksheetName: string;
}
/**
 * Main function to execute the report generation
 */
export function main(): Promise<{
    totalProcessed: any;
    outputRows: any;
    outputFile: string;
}>;
/**
 * Handles flattening of nested objects with arrays
 */
declare class ObjectFlattener {
    constructor(fields: any, parentKey: any);
    fields: any;
    parentKey: any;
    deduplicationManager: DeduplicationManager;
    flatten(obj: any): any;
    flattenRecursive(obj: any, parentData?: {}): any;
    findFirstArrayField(obj: any): {
        arrayRef: any[];
        arrayIndex: any;
        field: any;
    } | null;
    replaceArrayWithItem(obj: any, field: any, arrayIndex: any, item: any): any;
    createRow(obj: any, parentData: any): any;
}
/**
 * Handles merging of rows based on parent relationships
 */
declare class RowMerger {
    constructor(fields: any, parentKey: any);
    fields: any;
    parentKey: any;
    merge(rows: any): any[];
    groupByParent(rows: any): any;
    mergeGroup(rows: any): any[];
    canMergeRows(row1: any, row2: any): boolean;
    hasParentContextConflict(row1: any, row2: any, field: any): any;
    mergeRowData(targetRow: any, sourceRow: any): void;
}
/**
 * Handles deduplication logic for rows
 */
declare class DeduplicationManager {
    seenValues: Map<any, any>;
    reset(): void;
    shouldShowValue(ownerKey: any, field: any, value: any): boolean;
    createOwnerKey(obj: any, field: any, fields: any): string;
    createObjectSignature(obj: any, path: any, fields: any): {};
}
export {};
