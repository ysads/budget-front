import useWindowSize from '@/use/window-size';
import { setupHook } from '#/setup-hook';

const triggerResize = (width: number, height: number) => {
  (window.innerWidth as number) = width;
  (window.innerHeight as number) = height;
  window.dispatchEvent(new Event('resize'));
};

describe('useWindowSize', () => {
  describe('#width', () => {
    it('maps to window innerWidth', () => {
      const { width } = setupHook(() => useWindowSize()).result;

      triggerResize(1280, 720);
      expect(width.value).toEqual(1280);

      triggerResize(640, 480);
      expect(width.value).toEqual(640);
    });
  });

  describe('#height', () => {
    it('maps to window innerHeight', () => {
      const { height } = setupHook(() => useWindowSize()).result;

      triggerResize(1280, 720);
      expect(height.value).toEqual(720);

      triggerResize(640, 480);
      expect(height.value).toEqual(480);
    });
  });

  describe('#isMobile', () => {
    it('is true when innerWidth is smaller than 768px', () => {
      const { isMobile } = setupHook(() => useWindowSize()).result;

      triggerResize(1280, 720);
      expect(isMobile.value).toEqual(false);

      triggerResize(640, 480);
      expect(isMobile.value).toEqual(true);
    });
  });

  it('adds listener on mount', () => {
    window.addEventListener = jest.fn();

    setupHook(() => useWindowSize());

    expect(window.addEventListener).toHaveBeenCalledWith(
      'resize',
      expect.any(Function),
    );
  });

  it('removes listener on unmount', () => {
    window.removeEventListener = jest.fn();

    const app = setupHook(() => useWindowSize()).app;
    app.unmount();

    expect(window.removeEventListener).toHaveBeenCalledWith(
      'resize',
      expect.any(Function),
    );
  });
});
