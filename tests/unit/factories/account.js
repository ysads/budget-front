import random from 'lodash/random'
import sample from 'lodash/sample'
import uuid from 'uuid-random'
import Faker from 'faker'
import { ACCOUNT_TYPES } from '@/constants/account'
import { Factory } from 'fishery'

const ACCOUNT_NATURES = ['budget', 'tracking']

class AccountFactory extends Factory {
  budget () {
    return this.params({ nature: 'budget' })
  }

  tracking () {
    return this.params({ nature: 'tracking' })
  }
}

export default AccountFactory.define(({ sequence }) => {
  const balance = random(-10000, 60000)
  const clearedBalance = random(-10000, 60000)

  return {
    id: uuid(),
    balance: balance,
    budgetId: uuid(),
    clearedBalance: clearedBalance,
    nature: sample(ACCOUNT_NATURES),
    name: Faker.finance.accountName(),
    type: sample(ACCOUNT_TYPES),
    unclearedBalance: balance - clearedBalance,
  }
})
