import SadButton from '@/components/sad/SadButton';
import sample from 'lodash/sample';
import setupComponent from '#/setup-component';

const factory = (args = {}) =>
  setupComponent(SadButton, {
    props: {
      type: 'primary',
      size: 'normal',
      ...args.props,
    },
  });

describe('SadButton', () => {
  describe('default behaviour', () => {
    it('has primary type', () => {
      const wrapper = factory();

      expect(wrapper.vm.type).toEqual('primary');
    });

    it('has normal size', () => {
      const wrapper = factory();

      expect(wrapper.vm.size).toEqual('normal');
    });
  });

  it('adds a class according to type', () => {
    const type = sample(['primary', 'ghost']);
    const wrapper = factory({ props: { type } });
    const button = wrapper.find("[data-test='button']");

    expect(button.classes()).toContain(`button--${type}`);
  });

  it('adds a class according to size', () => {
    const wrapper = factory({ props: { size: 'small' } });
    const button = wrapper.find("[data-test='button']");

    expect(button.classes()).toContain('button--small');
  });

  describe('when icon prop is given', () => {
    it('renders a matching icon', () => {
      const wrapper = factory({ props: { icon: 'plus' } });
      const icon = wrapper.find("[data-test='icon']");

      expect(icon.classes()).toContain('fa-plus');
    });
  });

  describe('when full width prop is true', () => {
    it('renders button with button--full class', () => {
      const wrapper = factory({ props: { fullWidth: true } });
      const button = wrapper.find("[data-test='button']");

      expect(button.classes()).toContain('button--full');
    });
  });

  describe('when button is clicked', () => {
    it('emits click', async () => {
      const wrapper = factory();

      await wrapper.find("[data-test='button']").trigger('click');

      expect(wrapper.emitted().click).toBeTruthy();
    });
  });
});
