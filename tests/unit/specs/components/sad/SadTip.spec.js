import { factoryBuilder } from '#/factory-builder'
import Faker from 'faker'
import SadTip from '@/components/sad/SadTip'
import sample from 'lodash/sample'

const text = Faker.lorem.paragraph()
const variant = sample(['error', 'info'])

const factory = (args = {}) => factoryBuilder(SadTip, {
  propsData: {
    text,
    variant,
    ...args.propsData,
  },
})

describe('SadTip', () => {
  it('renders given text', () => {
    const wrapper = factory()
    const tip = wrapper.find("[data-test='tip']")

    expect(tip.text()).toBe(text)
  })

  it('adds a class according to variant', () => {
    const wrapper = factory()
    const tip = wrapper.find("[data-test='tip']")

    expect(tip.classes()).toContain(variant)
  })
})
