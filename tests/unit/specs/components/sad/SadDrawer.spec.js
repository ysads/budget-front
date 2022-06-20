import setupComponent from '#/setup-component';
import SadDrawer from '@/components/sad/SadDrawer';
import { eventBus, Events } from '@/events';

const factory = (args = {}) =>
  setupComponent(SadDrawer, {
    props: {
      title: args.title,
      show: true,
      ...args,
    },
    slots: {
      default: '<p id="content">my content</p>',
      footer: '<p id="footer">my footer</p>',
    },
    withMount: true,
  });

describe('SadDrawer', () => {
  it('renders content passed to main slot', () => {
    const wrapper = factory();
    const item = wrapper.find('#content');

    expect(item.text()).toEqual('my content');
  });

  it('renders content passed to footer', () => {
    const wrapper = factory();
    const item = wrapper.find('#footer');

    expect(item.text()).toEqual('my footer');
  });

  describe('when title is given', () => {
    it('renders title', () => {
      const wrapper = factory({ title: 'my title' });
      const item = wrapper.find("[data-test='title']");

      expect(item.text()).toEqual('my title');
    });
  });

  describe('when close is clicked', () => {
    it('emits close', async () => {
      const wrapper = factory();

      await wrapper.findComponent("[data-test='close-btn']").vm.$emit('click');

      expect(wrapper.emitted().close).toBeTruthy();
    });
  });

  describe('when overlay is clicked', () => {
    it('emits close', async () => {
      const wrapper = factory();

      await wrapper.find("[data-test='overlay']").trigger('click');

      expect(wrapper.emitted().close).toBeTruthy();
    });
  });

  describe('when CLOSE_DRAWER_MODAL is received', () => {
    it('emits close if drawer is visible', () => {
      const wrapper = factory({ show: true });

      eventBus.emit(Events.CLOSE_DRAWER_MODAL);

      expect(wrapper.emitted().close).toBeTruthy();
    });

    it('does not emit close if drawer is hidden', () => {
      const wrapper = factory({ show: false });

      eventBus.emit(Events.CLOSE_DRAWER_MODAL);

      expect(wrapper.emitted().close).toBeFalsy();
    });
  });
});
