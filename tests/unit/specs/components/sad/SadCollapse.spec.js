import SadCollapse from '@/components/sad/SadCollapse';
import setupComponent from '#/setup-component';

const factory = (args = {}) =>
  setupComponent(SadCollapse, { renderSlots: true, slots: args.slots });

describe('SadCollapse', () => {
  it('renders html passed to header', () => {
    const wrapper = factory({
      slots: { header: '<strong>header!</strong>' },
    });
    const button = wrapper.find("[data-test='header']");

    expect(button.html()).toMatch('<strong>header!</strong>');
  });

  it('renders html passed to content', () => {
    const wrapper = factory({
      slots: { default: '<i>content 🎉</i>' },
    });

    expect(wrapper.html()).toMatch('<i>content 🎉</i>');
  });

  it('starts open by default', () => {
    const wrapper = factory();
    const button = wrapper.find("[data-test='header']");

    expect(wrapper.classes()).not.toContain('collapsed');
    expect(button.attributes('aria-expanded')).toEqual('true');
  });

  describe('when user clicks header', () => {
    it('collapses content', async () => {
      const wrapper = factory();

      await wrapper.find("[data-test='header']").trigger('click');
      const button = wrapper.find("[data-test='header']");

      expect(wrapper.classes()).toContain('collapsed');
      expect(button.attributes('aria-expanded')).toEqual('false');
    });
  });
});
