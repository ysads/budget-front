import SadLabel from '@/components/sad/SadLabel';
import setupComponent from '#/setup-component';

const DummyInput = '<input type="text" id="input" ref="input" />';

const factory = () =>
  setupComponent(SadLabel, {
    props: {
      text: 'label-text',
      to: 'input',
    },
    slots: {
      default: DummyInput,
    },
    withMount: true,
  });

describe('SadLabel', () => {
  it('renders given text', () => {
    const wrapper = factory();
    const item = wrapper.find("[data-test='text']");

    expect(item.text()).toBe('label-text');
  });

  it('renders correlates label to given to prop', () => {
    const wrapper = factory();
    const item = wrapper.find("[data-test='label']");

    expect(item.attributes().for).toBe('input');
  });

  it('renders input passed as prop', () => {
    const wrapper = factory();
    const item = wrapper.find('#input');

    expect(item.exists()).toBe(true);
  });
});
