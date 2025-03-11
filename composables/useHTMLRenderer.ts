export const useHTMLRenderer = (htmlString: string) => {
  if (!import.meta.client) return;

  type TableBlock = {
    type: 'table';
    options: ReturnType<typeof useTableRenderer>;
  };

  type HtmlBlock = {
    type: 'html';
    html: string;
  };

  type Block = TableBlock | HtmlBlock;

  const parser = new DOMParser();
  const blocks: Block[] = []
  const doc = parser.parseFromString(htmlString, "text/html");
  const elements = doc.querySelectorAll('body > *:not(:empty)')
  elements.forEach((el) => {
    if (el.localName == 'table') blocks.push({
      type: 'table',
      options: useTableRenderer(el.outerHTML)
    }); else {
      blocks.push({
        type: 'html',
        html: el.outerHTML
      })
    }
  })

  console.log(blocks)

  return blocks
}
