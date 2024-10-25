import { ref } from "vue";

export const useDynamicHeight = (
  excludedElements: HTMLElement[] | string[]
) => {
  const height = ref(window.innerHeight);

  if (!excludedElements.length) {
    return { height: height, excludedElementsHeight: 0 };
  }

  const excludedElementsHeight = excludedElements
    .map((el) => {
      let offset;
      if (typeof el === "string") {
        // @ts-ignore
        offset = document.querySelector(el)?.offsetHeight;
      } else {
        offset = el.offsetHeight;
      }
      return offset;
    })
    .reduce((a, b) => a + b);

  height.value = window.innerHeight - excludedElementsHeight;

  window.addEventListener("resize", () => {
    height.value = window.innerHeight - excludedElementsHeight;
  });

  return { height, excludedElementsHeight };
};
