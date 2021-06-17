import SadCheckbox from '@/components/sad/SadCheckbox';
import sample from 'lodash/sample';
import setupComponent from '#/setup-component';

const factory = (args = {}) =>
  setupComponent(SadCheckbox, {
    props: {
      label: 'label',
      name: 'name',
      modelValue: '',
      ...args,
    },
  });

describe('SadCheckbox', () => {
  it('renders label', () => {
    const wrapper = factory();
    const item = wrapper.find("[data-test='label']");

    expect(item.text()).toEqual('label');
  });

  it('matches checkbox checked prop with modelValue', () => {
    const modelValue = sample([true, false]);
    const wrapper = factory({ modelValue });
    const item = wrapper.find("[data-test='input']");

    expect(item.element.checked).toEqual(modelValue);
  });

  describe('when tip prop is given', () => {
    it('renders tip with tip', () => {
      const wrapper = factory({ tip: 'Help text' });

      const tip = wrapper.findComponent("[data-test='tip']");

      expect(tip.props()).toMatchObject({
        text: 'Help text',
        variant: 'info',
      });
    });
  });

  describe('when input element emits input', () => {
    it('emits input with input checked state', async () => {
      const checked = sample([true, false]);
      const wrapper = factory();

      const input = wrapper.find("[data-test='input']");
      input.element.checked = checked;
      await input.trigger('input');

      expect(wrapper.emitted()['update:modelValue']).toEqual([[checked]]);
    });
  });
});
