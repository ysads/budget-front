import currencies from '@/support/currencies'
import faker from 'faker'
import sample from 'lodash/sample'
import { Factory } from 'fishery'

export default Factory.define(({ params }) => {
  const currency = params.currency || sample(currencies)
  const units = params.units || faker.random.number(5000)
  const cents = params.cents || faker.random.number(99)

  return `${currency} ${units},${cents}`
})
