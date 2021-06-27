import setupComponent from '#/setup-component';
import SadInput from '@/components/sad/SadInput';

const factory = (args = {}) =>
  setupComponent(SadInput, {
    props: {
      modelValue: 'value',
      name: 'input',
      label: 'label',
      ...args.props,
    },
  });

describe('SadInput', () => {
  describe('default behaviour', () => {
    it('has a null money', () => {
      const wrapper = factory();

      expect(wrapper.vm.money).toBeUndefined();
    });

    it('has no placeholder', () => {
      const wrapper = factory();

      expect(wrapper.vm.placeholder).toEqual('');
    });

    it('renders label', () => {
      const wrapper = factory();

      expect(wrapper.findComponent("[data-test='label']").props().text).toEqual(
        'label',
      );
    });

    it('does not render prefix', () => {
      const wrapper = factory();
      const item = wrapper.find("[data-test='prefix']");

      expect(item.exists()).toBeFalsy();
    });
  });

  describe('when error prop is given', () => {
    it('renders tip with error', () => {
      const wrapper = factory({ props: { error: 'Invalid' } });

      const tip = wrapper.findComponent("[data-test='tip']");

      expect(tip.props()).toMatchObject({
        text: 'Invalid',
        variant: 'error',
      });
    });

    it('renders error class on input', () => {
      const wrapper = factory({ props: { error: 'Invalid' } });

      const input = wrapper.find("[data-test='input']");

      expect(input.classes()).toContain('error');
    });
  });

  describe('when input emits input', () => {
    it('emits update:model-value to parent', async () => {
      const wrapper = factory();

      await wrapper.find("[data-test='input']").trigger('input');

      expect(wrapper.emitted()['update:model-value']).toBeTruthy();
    });
  });

  describe('when prefix is given', () => {
    it('renders prefix', () => {
      const wrapper = factory({ props: { prefix: '🐛' } });
      const item = wrapper.find("[data-test='prefix']");

      expect(item.text()).toEqual('🐛');
    });
  });
});
