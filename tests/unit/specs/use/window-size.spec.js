import useWindowSize from '@/use/window-size'
import { factoryBuilder } from '#/factory-builder'

const DummyComponent = {
  template: '<div>dummy</div>',
  setup () {
    return useWindowSize()
  },
}

const triggerResize = (width, height) => {
  window.innerWidth = width
  window.innerHeight = height
  window.dispatchEvent(new Event('resize'))
}

const factory = () => factoryBuilder(DummyComponent)

describe('useWindowSize', () => {
  describe('#width', () => {
    it('maps to window innerWidth', () => {
      const { vm } = factory()

      triggerResize(1280, 720)
      expect(vm.width).toEqual(1280)

      triggerResize(640, 480)
      expect(vm.width).toEqual(640)
    })
  })

  describe('#height', () => {
    it('maps to window innerHeight', () => {
      const { vm } = factory()

      triggerResize(1280, 720)
      expect(vm.height).toEqual(720)

      triggerResize(640, 480)
      expect(vm.height).toEqual(480)
    })
  })

  describe('#isMobile', () => {
    it('is true when innerWidth is smaller than 768px', () => {
      const { vm } = factory()

      triggerResize(1280, 720)
      expect(vm.isMobile).toEqual(false)

      triggerResize(640, 480)
      expect(vm.isMobile).toEqual(true)
    })
  })

  it('adds listener on mount', () => {
    window.addEventListener = jest.fn()

    factory()

    expect(window.addEventListener).toHaveBeenCalledWith(
      'resize', expect.any(Function),
    )
  })

  it('removes listener on unmount', () => {
    window.removeEventListener = jest.fn()

    factory().destroy()

    expect(window.removeEventListener).toHaveBeenCalledWith(
      'resize', expect.any(Function),
    )
  })
})
