import { Ref, ref } from 'vue';

type UseToogleHook = [Ref<boolean>, () => boolean];

export default function useToggle(initial?: boolean): UseToogleHook {
  const state = ref(initial ?? false);
  const toggle = () => (state.value = !state.value);

  return [state, toggle];
}
