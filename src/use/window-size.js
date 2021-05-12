import { computed, onMounted, onUnmounted, ref } from '@vue/composition-api'

const MOBILE_BREAKPOINT = 768

export default function useWindowSize () {
  const width = ref(window.innerWidth)
  const height = ref(window.innerHeight)
  const isMobile = computed(() => width.value <= MOBILE_BREAKPOINT)

  const update = () => {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }

  onMounted(() => {
    window.addEventListener('resize', update)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', update)
  })

  return { isMobile, height, width }
}
