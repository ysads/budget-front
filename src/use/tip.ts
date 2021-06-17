import { computed } from 'vue';

interface TipProps {
  error?: string;
  tip?: string;
}

export default function useTip(props: TipProps) {
  const tipText = computed(() => props.error || props.tip);
  const tipVariant = computed(() => (props.error ? 'error' : 'info'));
  const errorClass = computed(() => (props.error ? 'error' : ''));

  return {
    errorClass,
    tipText,
    tipVariant,
  };
}
