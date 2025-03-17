function _replace(el: HTMLElement, tg: string) {
  if (!el.textContent) return;
  el.innerHTML = el.textContent.replace(/\p{L}/gmu, `<${tg}>$&</${tg}>`);
  const bugs = el.querySelectorAll(tg);
  for (const bad of bugs) {
    if (!bad.textContent) bad.innerHTML = ("&nbsp");
  }
};

export const useSplitText = (textEl: HTMLElement | string): HTMLCollection | [] => {
  let el: HTMLElement | null = null;
  if (textEl instanceof HTMLElement) el = textEl;

  else if (typeof textEl === 'string' && import.meta.client) {
    el = document.querySelector(textEl);
  }

  if (!el) return []

  _replace(el, 'span');
  return el.children;
}
