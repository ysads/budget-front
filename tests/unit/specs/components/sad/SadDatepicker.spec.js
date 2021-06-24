import MockDate from 'mockdate';
import SadDatePicker from '@/components/sad/SadDatePicker';
import setupComponent from '#/setup-component';
import { ElDatePicker } from 'element-plus';

const factory = (args = {}) =>
  setupComponent(SadDatePicker, {
    props: {
      label: 'label',
      name: 'name',
      format: 'MM 👍 yyyy 👎 dd',
      value: '',
      ...args,
    },
    withMount: false,
  });

describe('SadDatePicker', () => {
  it('renders label', () => {
    const wrapper = factory();
    const item = wrapper.findComponent("[data-test='label']");

    expect(item.props().text).toEqual('label');
  });

  it('renders date picker with proper date format', () => {
    const wrapper = factory();
    const item = wrapper.findComponent(ElDatePicker);

    expect(item.vm.format).toEqual('MM 👍 yyyy 👎 dd');
  });

  describe('when no value is given', () => {
    beforeEach(() => MockDate.set(new Date()));
    afterEach(() => MockDate.reset());

    it('defaults modelValue to current date', () => {
      const { vm } = factory({ value: undefined });

      expect(vm.modelValue).toEqual(new Date());
    });
  });

  describe('when error prop is given', () => {
    it('renders tip with info', () => {
      const wrapper = factory({ tip: 'Help text' });

      const tip = wrapper.findComponent("[data-test='tip']");

      expect(tip.props()).toMatchObject({
        text: 'Help text',
        variant: 'info',
      });
    });
  });

  describe('when error prop is given', () => {
    it('renders tip with error', () => {
      const wrapper = factory({ error: 'Invalid' });

      const tip = wrapper.findComponent("[data-test='tip']");

      expect(tip.props()).toMatchObject({
        text: 'Invalid',
        variant: 'error',
      });
    });
  });

  it('proxies blur events from picker', async () => {
    const wrapper = factory();
    const item = wrapper.findComponent(ElDatePicker);

    await item.vm.$emit('blur');

    expect(wrapper.emitted().blur).toBeTruthy();
  });

  it('proxies input events from picker', async () => {
    const wrapper = factory();
    const item = wrapper.findComponent(ElDatePicker);

    await item.vm.$emit('update:model-value', '2021-03-05');

    expect(wrapper.emitted()['update:model-value']).toBeTruthy();
  });
});
