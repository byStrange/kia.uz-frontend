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

  // Parse the data rows using the unique header keys
  const rows = Array.from(table.querySelectorAll("tbody tr")).map(tr => {
    const cells = Array.from(tr.querySelectorAll("td")).map(td => td.textContent?.trim());
    return Object.fromEntries(headers.map((header, index) => [
      generateFieldKey(header || ''), 
      cells[index]
    ]));
  });

  return { fields, body: rows };
};
