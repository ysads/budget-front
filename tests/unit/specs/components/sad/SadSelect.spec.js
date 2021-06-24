import SadSelect from '@/components/sad/SadSelect';
import setupComponent from '#/setup-component';
// import { ElSelect } from 'element-pluss';

const groupOptions = [
  {
    label: 'label 1',
    options: [{ value: 'v1', label: 'value 1' }],
  },
  {
    label: 'label 2',
    options: [
      { value: 'v2', label: 'value 2' },
      { value: 'v3', label: 'value 3' },
    ],
  },
];
const singleOptions = [
  { value: 'v1', label: 'value 1' },
  { value: 'v2', label: 'value 2' },
];

const factory = (args = {}) =>
  setupComponent(SadSelect, {
    props: {
      label: 'label',
      name: 'name',
      modelValue: '',
      options: singleOptions,
      ...args,
    },
    renderSlots: true,
  });

describe('SadSelect', () => {
  it('renders label', () => {
    const wrapper = factory();
    const item = wrapper.findComponent("[data-test='label']");

    expect(item.props().text).toEqual('label');
  });

  it('is filterable', () => {
    const wrapper = factory();
    const item = wrapper.findComponent("[data-test='select']");

    expect(item.props().filterable).toEqual(true);
  });

  it('does not allow creating by default', () => {
    const wrapper = factory();
    const item = wrapper.findComponent("[data-test='select']");

    expect(item.props().allowCreate).toEqual(false);
  });

  describe('when disabled prop is given', () => {
    it('renders a disabled select', () => {
      const wrapper = factory({ disabled: true });
      const item = wrapper.findComponent("[data-test='select']");

      expect(item.props().disabled).toBeTruthy();
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

  describe('when select emits blur', () => {
    it('emits blur', async () => {
      const wrapper = factory();

      await wrapper.findComponent("[data-test='select']").vm.$emit('blur');

      expect(wrapper.emitted().blur).toBeTruthy();
    });
  });

  describe('when is grouped', () => {
    it('renders options grouped', () => {
      const wrapper = factory({ grouped: true, options: groupOptions });

      const groups = wrapper.findAllComponents("[data-test='select-group']");
      const groupOneOpts = groups[0].findAllComponents(
        "[data-test='select-option']",
      );
      const groupTwoOpts = groups[1].findAllComponents(
        "[data-test='select-option']",
      );

      expect(groupOneOpts.length).toEqual(1);
      expect(groupTwoOpts.length).toEqual(2);
    });
  });
});
