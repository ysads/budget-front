import useTip from '@/use/tip'
import { factoryBuilder } from '#/factory-builder'

const DummyComponent = {
  template: '<div>dummy</div>',
  props: ['error', 'tip'],
  setup (props) {
    return useTip(props)
  },
}

const factory = (args = {}) => factoryBuilder(DummyComponent, {
  propsData: args,
})

describe('useTip', () => {
  describe('#errorClass', () => {
    describe('when error prop is set', () => {
      it('returns `error`', () => {
        const { vm } = factory({ error: true })

        expect(vm.errorClass).toEqual('error')
      })
    })

    describe('when error prop is falsy', () => {
      it('returns empty string', () => {
        const { vm } = factory({ error: false })

        expect(vm.errorClass).toEqual('')
      })
    })
  })

  describe('#tipText', () => {
    describe('when error prop is present', () => {
      it('is error prop', () => {
        const { vm } = factory({ error: 'Invalid' })

        expect(vm.tipText).toEqual('Invalid')
      })
    })

    describe('when tip prop is present but error is not', () => {
      it('is tip prop', () => {
        const { vm } = factory({ tip: 'A guide text' })

        expect(vm.tipText).toEqual('A guide text')
      })
    })

    describe('when neither error nor tip props are present', () => {
      it('is falsy', () => {
        const { vm } = factory({ error: undefined, tip: undefined })

        expect(vm.tipText).toBeFalsy()
      })
    })
  })

  describe('#tipVariant', () => {
    describe('when error prop is present', () => {
      it('equals to error', () => {
        const { vm } = factory({ error: 'Invalid' })

        expect(vm.tipVariant).toEqual('error')
      })
    })

    it('defaults to info', () => {
      const { vm } = factory({ tip: 'A guide text' })

      expect(vm.tipVariant).toEqual('info')
    })
  })
})
