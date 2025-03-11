export const useTableRenderer = (htmlString: string) => {
  if (!import.meta.client) return;

  const generateFieldKey = (label: string) => {
    return label
      .toLowerCase()
      .replace(/\s+/g, "_")
      .trim();
  };
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const table = doc.querySelector("table");

  if (!table) return;

  const fields = Array.from(table.querySelectorAll("thead :is(td,th)")).map(th => {
    const label = th.textContent?.trim();
    return { field: generateFieldKey(label || ''), label };
  });

  const headers = Array.from(table.querySelectorAll("thead :is(td, th)")).map(th => th.textContent?.trim());
  const rows = Array.from(table.querySelectorAll("tbody tr")).map(tr => {
    const cells = Array.from(tr.querySelectorAll("td")).map(td => td.textContent?.trim());
    return Object.fromEntries(headers.map((header, index) => [generateFieldKey(header || ''), cells[index]]));
  });


  return { fields, body: rows };
};
