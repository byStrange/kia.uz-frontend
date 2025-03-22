export const useHTMLRenderer = (htmlString: string) => {
  if (!import.meta.client) return [];

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

  type ImageBlock = {
    type: 'image',
    src: string
    alt?: string
  }

  type HeadingBlock = {
    type: 'heading',
    level: 'h1' | 'h2' | 'h3' | 'h4',
    text: string | null
  }

  type ListBlock = {
    type: 'list',
    items: string[]
  }

  type TextBlock = {
    type: 'text',
    text: string | null
  }

  type Block = TableBlock | HtmlBlock | AnchorBlock | ImageBlock | HeadingBlock | TextBlock | ListBlock

  const parser = new DOMParser();
  const blocks: Block[] = []
  const doc = parser.parseFromString(htmlString, "text/html");
  const elements = doc.querySelectorAll('body > *:not(:empty)')
  elements.forEach((el) => {
    const img = el.querySelector('img')
    const list = el.querySelector('ul')
    if (el.localName == 'table') blocks.push({
      type: 'table',
      options: useTableRenderer(el.outerHTML)
    });
    else if (img) {
      blocks.push({
        type: 'image',
        src: img.src,
        alt: img.alt
      })
    }
    else if (list) {
      blocks.push({
        type: 'list',
        items: Array.from(list.querySelectorAll('li')).map((li) => li.textContent || '')
      })
    }
    else if (el.localName === 'ul') {
      blocks.push({
        type: 'list',
        items: Array.from(el.querySelectorAll('li')).map((li) => li.textContent || '')
      })
    }
    else if (['h1', 'h2', 'h3', 'h4'].includes(el.localName)) {
      blocks.push({
        type: 'heading',
        level: el.localName as HeadingBlock['level'],
        text: el.textContent
      })
    }
    else if (el.localName === 'p' && el.querySelector('*:not(br)') == null) {
      blocks.push({
        type: 'text',
        text: el.textContent
      })
    }
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
