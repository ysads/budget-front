import currencies from '@/support/currencies'
import faker from 'faker'
import sample from 'lodash/sample'
import { Factory } from 'fishery'

export default Factory.define(({ params }) => {
  const currency = params.currency || sample(currencies)
  const units = params.units || faker.datatype.number(5000)
  const cents = params.cents || faker.datatype.number(99)

  return `${currency} ${units},${cents}`
})
