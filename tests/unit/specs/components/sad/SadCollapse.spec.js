import SadCollapse from '@/components/sad/SadCollapse';
import setupComponent from '#/setup-component';

const factory = () => setupComponent(SadCollapse);

describe('SadCollapse', () => {
  it('starts open by default', () => {
    const wrapper = factory();

    expect(wrapper.classes()).not.toContain('collapse');
  });

  describe('when user clicks header', () => {
    it('collapses content', async () => {
      const wrapper = factory();

      await wrapper.find("[data-test='header']").trigger('click');

      expect(wrapper.classes()).toContain('collapsed');
    });
  });

  describe('when user chooses header', () => {
    it('collapses content', async () => {
      const wrapper = factory();

      await wrapper.find("[data-test='header']").trigger('keydown.space');

      expect(wrapper.classes()).toContain('collapsed');
    });
  });
});
