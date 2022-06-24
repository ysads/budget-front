import useToggle from '@/use/toggle';

describe('useToggle', () => {
  it('starts false by default', () => {
    const [state, _] = useToggle();

    expect(state.value).toBe(false);
  });

  it('starts with passed value when available', () => {
    const [state, _] = useToggle(true);

    expect(state.value).toBe(true);
  });

  it('changes value to true when state is false', () => {
    const [state, toggle] = useToggle(false);

    toggle();
    expect(state.value).toBe(true);
  });

  it('changes value to false when state is true', () => {
    const [state, toggle] = useToggle(true);

    toggle();
    expect(state.value).toBe(false);
  });
});
