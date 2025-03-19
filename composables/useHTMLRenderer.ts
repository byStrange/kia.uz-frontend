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

  type AnchorBlock = {
    type: 'link';
    link: string | null;
    text: string | null;
  }

  type Block = TableBlock | HtmlBlock | AnchorBlock;

  const parser = new DOMParser();
  const blocks: Block[] = []
  const doc = parser.parseFromString(htmlString, "text/html");
  const elements = doc.querySelectorAll('body > *:not(:empty)')
  elements.forEach((el) => {
    if (el.localName == 'table') blocks.push({
      type: 'table',
      options: useTableRenderer(el.outerHTML)
    });
    else if (el.localName == 'a') {
      blocks.push({
        type: 'link',
        link: el.getAttribute('href'),
        text: el.textContent
      })
    }
    else {
      blocks.push({
        type: 'html',
        html: el.outerHTML
      })
    }
  })

  return blocks
}
