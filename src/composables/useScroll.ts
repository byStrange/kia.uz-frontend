import { ref, onMounted, onUnmounted } from 'vue';
import { useHeaderService } from '@/services/headerService';
const { headerService } = useHeaderService();

export function useScroll() {
  const scrollDirection = ref<null | 'up' | 'down'>(null);
  const scrollSpeed = ref(0);
  let lastScrollY = window.scrollY;
  let lastScrollTime = Date.now();
  const speedThreshold = 0.5; // Adjust this threshold based on your requirements

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    const currentTime = Date.now();

    // Calculate the scroll distance and time difference
    const distance = currentScrollY - lastScrollY;
    const timeElapsed = currentTime - lastScrollTime;

    // Calculate scroll speed (pixels per millisecond)
    const speed = Math.abs(distance) / timeElapsed;

    // Determine scroll direction
    if (distance > 0) {
      scrollDirection.value = 'down';
    } else if (distance < 0) {
      scrollDirection.value = 'up';
    } else {
      scrollDirection.value = null; // No scroll
    }

    // Update the scroll speed
    scrollSpeed.value = speed;

    // Determine if the header should be fixed
    if (currentScrollY === 0) {
      headerService.value.isHeaderFixed = false;
    } else if (scrollDirection.value === 'up' && speed > speedThreshold) {
      headerService.value.isHeaderFixed = true;
    } else if (scrollDirection.value === 'down') {
      headerService.value.isHeaderFixed = false;
    }

    // Update last scroll position and time
    lastScrollY = currentScrollY;
    lastScrollTime = currentTime;
  };

  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });

  return {
    scrollDirection,
    scrollSpeed,
    headerFixed: headerService.value.isHeaderFixed,
  };
}