import { computed, ComputedRef, onMounted, onUnmounted, Ref, ref } from 'vue';

const MOBILE_BREAKPOINT = 768;

export interface UseWindowHook {
  isMobile: ComputedRef<boolean>;
  height: Ref<number>;
  width: Ref<number>;
}

export default function useWindowSize(): UseWindowHook {
  const width = ref(window.innerWidth);
  const height = ref(window.innerHeight);
  const isMobile = computed(() => width.value <= MOBILE_BREAKPOINT);

  const update = () => {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
  };

  onMounted(() => {
    window.addEventListener('resize', update);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', update);
  });

  return { isMobile, height, width };
}
