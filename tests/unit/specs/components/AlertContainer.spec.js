import AlertContainer from '@/components/AlertContainer'
import eventBus, { SHOW_ALERT } from '@/events'
import faker from 'faker'
import { factoryBuilder } from '#/factory-builder'
import { nextTick } from '@vue/composition-api'

// jest.mock('@/events', () => ({
//   emit: jest.fn(),
//   on: jest.fn(),
//   SHOW_ALERT: 'mock-event',
// }))

const buildAlert = () => ({
  message: faker.name.findName(),
  variant: 'error',
})

const factory = (args = {}) => factoryBuilder(AlertContainer, {
  propsData: args.props,
  slots: args.slots,
})

describe('AlertContainer', () => {
  describe('when SHOW_ALERT event is received', () => {
    it('adds a new alert', async () => {
      const wrapper = factory()
      const alert = buildAlert()

      expect(wrapper.findAll('[data-test="alert"]').length).toEqual(0)

      await eventBus.emit(SHOW_ALERT, alert)

      expect(wrapper.findAll('[data-test="alert"]').length).toEqual(1)
    })

    it('conjoins an id to the alert', async () => {
      const { vm } = factory()
      const alert = buildAlert()

      await eventBus.emit(SHOW_ALERT, alert)

      expect(vm.alerts[0].id).toBeTruthy()
    })
  })

  describe('when alert emits close', () => {
    it('removes alert from alerts array', async () => {
      const wrapper = factory()

      await eventBus.emit(SHOW_ALERT, buildAlert())

      expect(wrapper.vm.alerts.length).toEqual(1)

      const alert = wrapper.find('[data-test="alert"]')
      await alert.vm.$emit('close', alert.props().id)

      expect(wrapper.vm.alerts.length).toEqual(0)
    })
  })
})
