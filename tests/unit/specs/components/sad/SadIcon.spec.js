import setupComponent from '#/setup-component';
import SadIcon from '@/components/sad/SadIcon';
import sample from 'lodash/sample';

const name = 'times';
const size = sample(['tiny', 'small', 'medium']);

const factory = (args = {}) =>
  setupComponent(SadIcon, {
    props: {
      name,
      size,
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
});
