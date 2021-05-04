import accountFactory from './account'
import faker from 'faker'
import payeeFactory from './payee'
import { Factory } from 'fishery'

export default Factory.define(({ transientParams }) => {
  // const { withRelations = true } = transientParams

  const base = {
    amount: faker.datatype.number(),
    clearedAt: faker.datatype.datetime().toISOString(),
    destinationId: faker.datatype.uuid(),
    id: faker.datatype.uuid(),
    memo: faker.lorem.sentence(),
    originId: faker.datatype.uuid(),
    monthlyBudgetId: faker.datatype.uuid(),
    referenceAt: faker.datatype.datetime().toISOString(),
    payee: payeeFactory.build(),
    origin: accountFactory.build(),
  }

  return base
})
