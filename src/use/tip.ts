import { computed, ComputedRef } from 'vue';

export interface TipProps {
  error?: string;
  tip?: string;
}

interface UseTipHook {
  errorClass: ComputedRef<'error' | ''>;
  tipText: ComputedRef<string | undefined>;
  tipVariant: ComputedRef<'error' | 'info'>;
}

export default function useTip(props: TipProps): UseTipHook {
  const tipText = computed(() => props.error || props.tip);
  const tipVariant = computed(() => (props.error ? 'error' : 'info'));
  const errorClass = computed(() => (props.error ? 'error' : ''));

  return {
    errorClass,
    tipText,
    tipVariant,
  };
}
