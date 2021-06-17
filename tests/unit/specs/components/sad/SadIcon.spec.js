import setupComponent from '#/setup-component';
import SadIcon from '@/components/sad/SadIcon';
import sample from 'lodash/sample';

const name = 'times';
const size = sample(['small', 'medium']);
const color = sample(['green', 'info', 'primary', 'red', 'yellow']);

const factory = (args = {}) =>
  setupComponent(SadIcon, {
    props: {
      name,
      size,
      color,
      ...args,
    },
  });

describe('SadIcon', () => {
  it('renders icon using given name', () => {
    const wrapper = factory();

    expect(wrapper.classes()).toContain(`fa-${name}`);
  });

  it('renders icon with size class', () => {
    const wrapper = factory();

    expect(wrapper.classes()).toContain(`sad-icon--${size}`);
  });

  it('renders icon with color class', () => {
    const wrapper = factory();

    expect(wrapper.classes()).toContain(`sad-icon--${color}`);
  });

  it('does not render a button wrapper by default', () => {
    const wrapper = factory();
    const item = wrapper.find("[data-test='button']");

    expect(item.exists()).toBeFalsy();
  });

  describe('when clickable prop is true', () => {
    it('emits click when button is clicked', () => {
      const wrapper = factory({ clickable: true });

      wrapper.find('button').trigger('click');

      expect(wrapper.emitted().click).toBeTruthy();
    });
  });
});
