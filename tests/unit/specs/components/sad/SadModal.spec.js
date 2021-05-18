import SadModal from '@/components/sad/SadModal';
import setupComponent from '#/setup-component';

const factory = (args = {}) =>
  setupComponent(SadModal, {
    props: {
      show: true,
      title: args.title,
    },
    slots: args.slots,
    stubs: { transition: false },
    withMount: true,
  });

describe('SadModal', () => {
  it('renders content passed to foot slot', () => {
    const button = '<button id="btn">hello</button>';
    const wrapper = factory({ slots: { footer: button } });

    const item = wrapper.find('#btn');

    expect(item.exists()).toBeTruthy();
  });

  it('renders content passed to main slot', () => {
    const content = '<div id="content">hello</div>';
    const wrapper = factory({ slots: { default: content } });

    const item = wrapper.find('#content');

    expect(item.exists()).toBeTruthy();
  });

  it('does not render a title by default', () => {
    const wrapper = factory();

    const item = wrapper.find("[data-test='title']");

    expect(item.exists()).toEqual(false);
  });

  describe('when title prop is given', () => {
    it('renders a title', () => {
      const mockTitle = 'mock';
      const wrapper = factory({ title: mockTitle });

      const item = wrapper.find("[data-test='title']");

      expect(item.text()).toEqual(mockTitle);
    });
  });

  describe('when overlay is clicked', () => {
    it('emits close', async () => {
      const wrapper = factory();

      await wrapper.find("[data-test='overlay']").trigger('click');

      expect(wrapper.emitted().close).toBeTruthy();
    });
  });

  describe('when close button is clicked', () => {
    it('emits close', async () => {
      const wrapper = factory();

      await wrapper.find("[data-test='close-btn']").trigger('click');

      expect(wrapper.emitted().close).toBeTruthy();
    });
  });
});
