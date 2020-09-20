import sample from 'lodash/sample'
import currencies from '@/support/currencies'
import uuid from 'uuid-random'
import Faker from 'faker'
import { Factory } from 'fishery'

export default Factory.define(({ sequence }) => {
  return {
    id: uuid(),
    currency: sample(currencies),
    name: Faker.finance.accountName(),
  }
})
