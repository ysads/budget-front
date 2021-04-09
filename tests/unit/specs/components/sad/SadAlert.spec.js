import faker from 'faker'
import SadAlert from '@/components/sad/SadAlert'
import sample from 'lodash/sample'
import { factoryBuilder } from '#/factory-builder'

const VARIANTS = ['error', 'success', 'warning']

const factory = (args = {}) => factoryBuilder(SadAlert, {
  propsData: {
    duration: 0,
    id: faker.datatype.uuid(),
    message: faker.lorem.sentence(),
    variant: sample(VARIANTS),
    ...args,
  },
})

describe('SadAlert', () => {
  it('renders a ribbon with variant class', () => {
    const variant = sample(VARIANTS)
    const wrapper = factory({ variant })
    const item = wrapper.find("[data-test='ribbon']")

    expect(item.classes()).toContain(`sad-alert__ribbon-${variant}`)
  })

  it('renders message', () => {
    const message = faker.lorem.sentence()
    const wrapper = factory({ message })
    const item = wrapper.find("[data-test='message']")

    expect(item.text()).toContain(message)
  })

  describe('when variant is error', () => {
    it('renders a red exclamation circle icon', () => {
      const wrapper = factory({ variant: 'error' })
      const item = wrapper.find("[data-test='variant-icon']")

      expect(item.props()).toMatchObject({
        color: 'red',
        name: 'exclamation-circle',
      })
    })
  })

  describe('when variant is success', () => {
    it('renders a red exclamation circle icon', () => {
      const wrapper = factory({ variant: 'success' })
      const item = wrapper.find("[data-test='variant-icon']")

      expect(item.props()).toMatchObject({
        color: 'green',
        name: 'check-circle',
      })
    })
  })

  describe('when variant is warning', () => {
    it('renders a red exclamation circle icon', () => {
      const wrapper = factory({ variant: 'warning' })
      const item = wrapper.find("[data-test='variant-icon']")

      expect(item.props()).toMatchObject({
        color: 'yellow',
        name: 'exclamation-triangle',
      })
    })
  })

  describe('when close button is clicked', () => {
    it('emits close', async () => {
      const id = faker.datatype.uuid()
      const wrapper = factory({ id })

      await wrapper.find("[data-test='close-icon']").trigger('click')

      expect(wrapper.emitted().close[0][0]).toEqual(id)
    })
  })

  describe('after specified duration passes', () => {
    it('emits close', () => {
      jest.useFakeTimers()

      const duration = 5000
      const id = faker.datatype.uuid()
      const wrapper = factory({ duration, id })

      jest.advanceTimersByTime(duration)

      expect(wrapper.emitted().close[0][0]).toEqual(id)
    })
  })
})
