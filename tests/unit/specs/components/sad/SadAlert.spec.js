import faker from 'faker';
import SadAlert from '@/components/sad/SadAlert';
import SadIcon from '@/components/sad/SadIcon';
import sample from 'lodash/sample';
import setupComponent from '#/setup-component';

const VARIANTS = ['error', 'success', 'warning'];

const factory = (args = {}) =>
  setupComponent(SadAlert, {
    props: {
      duration: 0,
      id: faker.datatype.uuid(),
      message: faker.lorem.sentence(),
      variant: sample(VARIANTS),
      ...args,
    },
  });

describe('SadAlert', () => {
  it('renders a wrapper with variant class', () => {
    const variant = sample(VARIANTS);
    const wrapper = factory({ variant });

    expect(wrapper.classes()).toContain(`sad-alert--${variant}`);
  });

  it('renders message', () => {
    const message = faker.lorem.sentence();
    const wrapper = factory({ message });
    const item = wrapper.find("[data-test='message']");

    expect(item.text()).toContain(message);
  });

  describe('when variant is error', () => {
    it('renders an exclamation circle icon', () => {
      const wrapper = factory({ variant: 'error' });
      const item = wrapper.findComponent(SadIcon);

      expect(item.props()).toMatchObject({
        name: 'exclamation-circle',
      });
    });
  });

  describe('when variant is success', () => {
    it('renders a check circle icon', () => {
      const wrapper = factory({ variant: 'success' });
      const item = wrapper.findComponent(SadIcon);

      expect(item.props()).toMatchObject({
        name: 'check-circle',
      });
    });
  });

  describe('when variant is warning', () => {
    it('renders an exclamation triangle icon', () => {
      const wrapper = factory({ variant: 'warning' });
      const item = wrapper.findComponent(SadIcon);

      expect(item.props()).toMatchObject({
        name: 'exclamation-triangle',
      });
    });
  });

  describe('when close button is clicked', () => {
    it('emits close', async () => {
      const id = faker.datatype.uuid();
      const wrapper = factory({ id });

      await wrapper.find("[data-test='close-icon']").trigger('click');

      expect(wrapper.emitted().close[0][0]).toEqual(id);
    });
  });

  describe('after specified duration passes', () => {
    it('emits close', () => {
      jest.useFakeTimers();

      const duration = 5000;
      const id = faker.datatype.uuid();
      const wrapper = factory({ duration, id });

      jest.advanceTimersByTime(duration);

      expect(wrapper.emitted().close[0][0]).toEqual(id);
    });
  });
});
