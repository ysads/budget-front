import { computed } from '@vue/composition-api'

export default function useTip (props) {
  const tipText = computed(() => props.error || props.tip)
  const tipVariant = computed(() => props.error ? 'error' : 'info')

  return {
    tipText,
    tipVariant,
  }
}
