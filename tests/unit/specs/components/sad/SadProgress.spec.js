import SadProgress from '@/components/sad/SadProgress';
import setupComponent from '#/setup-component';

const factory = (args = {}) =>
  setupComponent(SadProgress, {
    props: {
      value: 25,
      color: 'blue',
      ...args,
    },
  });

describe('SadProgress', () => {
  it('renders an element with `progressbar` role', () => {
    const wrapper = factory();
    const item = wrapper.find("[role='progressbar']");

    expect(item.exists()).toBeTruthy();
  });

  it('renders a progress bar bounded by 0 and 100', () => {
    const wrapper = factory();
    const item = wrapper.find("[role='progressbar']");

    expect(item.attributes('aria-valuemin')).toEqual('0');
    expect(item.attributes('aria-valuemax')).toEqual('100');
  });

  it('uses value prop as current value', () => {
    const wrapper = factory({ value: 75 });
    const item = wrapper.find("[role='progressbar']");

    expect(item.attributes('aria-valuenow')).toEqual('75');
  });

  it('applies a class corresponding to color', () => {
    const wrapper = factory({ color: 'blue' });
    const item = wrapper.find("[role='progressbar']");

    expect(item.classes()).toContain('sad-progress--blue');
  });

  it('uses inline style to set elapsed percentage', () => {
    const wrapper = factory({ value: 30 });
    const item = wrapper.find("[data-test='elapsed']");

    expect(item.attributes('style')).toEqual('width: 30%;');
  });
});
