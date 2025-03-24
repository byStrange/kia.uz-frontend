export const useTableRenderer = (htmlString: string) => {
  if (!import.meta.client) return;

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const table = doc.querySelector("table");

  if (!table) return;

  // Track counts of each header to handle duplicates
  const headerCounts: Record<string, number> = {};

  const headers = Array.from(table.querySelectorAll("thead :is(td, th)")).map(th => {
    const headerText = th.textContent?.trim() || '';
    
    // Update counter for this header
    headerCounts[headerText] = (headerCounts[headerText] || 0) + 1;
    
    // If this is a duplicate, append the count to make it unique
    if (headerCounts[headerText] > 1) {
      return `${headerText}_${headerCounts[headerText]}`;
    }
    
    return headerText;
  });

  // Generate field keys for unique headers (for display/reference)
  const generateFieldKey = (label: string) => {
    return label
      .toLowerCase()
      .replace(/\s+/g, "_")
      .trim();
  };

  // Create fields array with unique keys
  const fields = headers.map(header => {
    // Extract the base header without the _N suffix if it exists
    const baseHeader = header.includes('_') ? 
      header.substring(0, header.lastIndexOf('_')) : 
      header;
      
    return {
      field: generateFieldKey(header || ''),
      label: baseHeader // Display the original header name without the unique identifier
    };
  });

  // Track which cells have rowspan applied and their values
  const rowspanTracker: Record<number, Record<string, { value: string | number, remainingRows: number }>> = {};
  
  // Parse the data rows, handling merged cells using rowspans and colspans
  let rows: Record<string, any>[] = [];
  
  // Process each row in the table body
  Array.from(table.querySelectorAll("tbody tr")).forEach((tr, rowIndex) => {
    const rowData: Record<string, any> = {};
    const rowspanData: Record<string, boolean> = {}; // Track fields with rowspan in current row
    let colIndex = 0;
    
    // First apply any active rowspans from previous rows
    if (rowspanTracker[rowIndex]) {
      Object.keys(rowspanTracker[rowIndex]).forEach(fieldKey => {
        const { value, remainingRows } = rowspanTracker[rowIndex][fieldKey];
        rowData[fieldKey] = value;
        
        // Mark this field as having an active rowspan
        rowspanData[fieldKey] = true;
        
        // Update tracker for next row if rowspan continues
        if (remainingRows > 1) {
          rowspanTracker[rowIndex + 1] = rowspanTracker[rowIndex + 1] || {};
          rowspanTracker[rowIndex + 1][fieldKey] = { 
            value, 
            remainingRows: remainingRows - 1 
          };
        }
      });
    }
    
    // Get all cells in this row
    const cells = Array.from(tr.querySelectorAll("td"));
    
    // Process each header/column
    headers.forEach((header, headerIndex) => {
      const fieldKey = generateFieldKey(header || '');
      
      // Skip if this cell is already filled by a rowspan from a previous row
      if (rowspanData[fieldKey]) {
        return;
      }
      
      // If we have a cell for this column
      if (colIndex < cells.length) {
        const cell = cells[colIndex];
        const cellContent = cell.textContent?.trim() || '';
        
        // Check for rowspan attribute
        const rowspan = parseInt(cell.getAttribute('rowspan') || '1', 10);
        
        // Add the cell content to the current row
        rowData[fieldKey] = cellContent;
        
        // If this cell has rowspan > 1, track it for future rows
        if (rowspan > 1) {
          // Mark this field as having rowspan in the current row
          rowspanData[fieldKey] = true;
          
          // Setup tracking for subsequent rows
          for (let i = 1; i < rowspan; i++) {
            const targetRowIndex = rowIndex + i;
            rowspanTracker[targetRowIndex] = rowspanTracker[targetRowIndex] || {};
            rowspanTracker[targetRowIndex][fieldKey] = {
              value: cellContent,
              remainingRows: rowspan - i
            };
          }
        }
        
        colIndex++;
      } else {
        // If we don't have a cell for this column (due to colspan in other cells)
        rowData[fieldKey] = '';
      }
    });
    
    // Store which fields have rowspan set
    rowData._rowspanFields = Object.keys(rowspanData).length > 0 ? rowspanData : undefined;
    
    rows.push(rowData);
  });
  
  // Post-process rows to properly handle hierarchical data
  // and ensure all rows have consistent structure
  const processedRows = rows.map((row, rowIndex) => {
    const processedRow = { ...row };
    
    // Loop through each field to ensure all fields are present
    fields.forEach(({ field }) => {
      // If current cell is empty and not part of a rowspan
      if ((!processedRow[field] || processedRow[field] === '') && 
          (!processedRow._rowspanFields || !processedRow._rowspanFields[field])) {
        // Set a default empty value
        processedRow[field] = '';
      }
    });
    
    return processedRow;
  });

  return { 
    fields, 
    body: processedRows,
    // Add metadata about which fields have rowspan attributes
    metadata: {
      hasRowspans: Object.keys(rowspanTracker).length > 0
    }
  };
};

// Helper function to normalize table data (if needed)
export const normalizeTableData = (data: Record<string, any>[]) => {
  if (!data || data.length === 0) return [];
  
  // Process numeric values for calculation
  return data.map(row => {
    const normalizedRow = { ...row };
    
    // Skip non-data properties
    const dataKeys = Object.keys(normalizedRow).filter(key => !key.startsWith('_'));
    
    // Convert values that appear to be numbers to actual numbers
    dataKeys.forEach(key => {
      const value = normalizedRow[key];
      
      if (typeof value === 'string') {
        // Try to parse numeric values (handles currency formatting)
        const numericValue = value.replace(/[^\d.-]/g, '');
        if (/^-?\d+(\.\d+)?$/.test(numericValue)) {
          normalizedRow[key] = parseFloat(numericValue);
        }
      }
    });
    
    return normalizedRow;
  });
};
