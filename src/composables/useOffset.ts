// useOffset.js
import { ref, onMounted, onBeforeUnmount } from 'vue';

export function useOffset(element: HTMLElement) {
  const offsetLeft = ref(0);
  const offsetTop = ref(0);

  const updateOffsetLeft = () => {
    if (element) {
      offsetLeft.value = element.offsetLeft;
      offsetTop.value = element.offsetTop;
    }
  };

  onMounted(() => {
    updateOffsetLeft();
    const observer = new MutationObserver(updateOffsetLeft);

    observer.observe(element, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    window.addEventListener('resize', updateOffsetLeft);

    onBeforeUnmount(() => {
      observer.disconnect();
      window.removeEventListener('resize', updateOffsetLeft);
    });
  });

  return { offsetLeft, offsetTop };
}
