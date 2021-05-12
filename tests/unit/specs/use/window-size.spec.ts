import useWindowSize from '@/use/window-size';
import setupComponent from '#/setup-component';
import { defineComponent } from 'vue';

const DummyComponent = defineComponent({
  setup() {
    return useWindowSize();
  },
});

const triggerResize = (width: number, height: number) => {
  (window.innerWidth as number) = width;
  (window.innerHeight as number) = height;
  window.dispatchEvent(new Event('resize'));
};

const factory = () => setupComponent(DummyComponent);

describe('useWindowSize', () => {
  describe('#width', () => {
    it('maps to window innerWidth', () => {
      const { vm } = factory();

      triggerResize(1280, 720);
      expect(vm.width).toEqual(1280);

      triggerResize(640, 480);
      expect(vm.width).toEqual(640);
    });
  });

  describe('#height', () => {
    it('maps to window innerHeight', () => {
      const { vm } = factory();

      triggerResize(1280, 720);
      expect(vm.height).toEqual(720);

      triggerResize(640, 480);
      expect(vm.height).toEqual(480);
    });
  });

  describe('#isMobile', () => {
    it('is true when innerWidth is smaller than 768px', () => {
      const { vm } = factory();

      triggerResize(1280, 720);
      expect(vm.isMobile).toEqual(false);

      triggerResize(640, 480);
      expect(vm.isMobile).toEqual(true);
    });
  });

  it('adds listener on mount', () => {
    window.addEventListener = jest.fn();

    factory();

    expect(window.addEventListener).toHaveBeenCalledWith(
      'resize',
      expect.any(Function),
    );
  });

  it('removes listener on unmount', () => {
    window.removeEventListener = jest.fn();

    factory().unmount();

    expect(window.removeEventListener).toHaveBeenCalledWith(
      'resize',
      expect.any(Function),
    );
  });
});
