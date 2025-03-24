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

  // Parse the data rows, handling merged cells using rowspans and colspans
  let rows: Record<string, string | number>[] = [];
  let previousRowValues: Record<string, any> = {};
  
  // Process each row in the table body
  Array.from(table.querySelectorAll("tbody tr")).forEach((tr, rowIndex) => {
    const rowData: Record<string, string | number> = {};
    let cellIndex = 0;
    
    // Get all cells in this row
    const cells = Array.from(tr.querySelectorAll("td"));
    
    // Process each header
    headers.forEach((header, headerIndex) => {
      const fieldKey = generateFieldKey(header || '');
      
      // If we have a cell for this column
      if (cellIndex < cells.length) {
        const cell = cells[cellIndex];
        const cellContent = cell.textContent?.trim() || '';
        
        // Check if this is an empty cell that might be part of a merged cell
        if (cellContent === '') {
          // Try to use value from previous row if this appears to be a merged cell
          if (previousRowValues[fieldKey] !== undefined) {
            rowData[fieldKey] = previousRowValues[fieldKey];
          } else {
            rowData[fieldKey] = '';
          }
        } else {
          // This is a regular cell with content
          rowData[fieldKey] = cellContent;
          
          // Store this value for potential use in future rows (merged cells)
          previousRowValues[fieldKey] = cellContent;
        }
        
        cellIndex++;
      } else {
        // If we don't have a cell for this column, use previous value if available
        rowData[fieldKey] = previousRowValues[fieldKey] || '';
      }
    });
    
    rows.push(rowData);
  });
  
  // Post-process rows to properly handle hierarchical data
  // Fill empty cells with values from previous rows for continuity
  const processedRows = rows.map((row, rowIndex) => {
    const processedRow = { ...row };
    
    // Loop through each field
    fields.forEach(({ field }) => {
      // If current cell is empty and we have previous rows
      if ((!processedRow[field] || processedRow[field] === '') && rowIndex > 0) {
        // Fill with the most recent non-empty value from previous rows
        for (let i = rowIndex - 1; i >= 0; i--) {
          if (rows[i][field] && rows[i][field] !== '') {
            processedRow[field] = rows[i][field];
            break;
          }
        }
      }
    });
    
    return processedRow;
  });

  return { fields, body: processedRows };
};

// Helper function to normalize table data (if needed)
export const normalizeTableData = (data: Record<string, any>[]) => {
  if (!data || data.length === 0) return [];
  
  // Process numeric values for calculation
  return data.map(row => {
    const normalizedRow = { ...row };
    
    // Convert values that appear to be numbers to actual numbers
    Object.keys(normalizedRow).forEach(key => {
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
