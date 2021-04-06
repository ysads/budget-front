import faker from 'faker'
import { Factory } from 'fishery'

const randInt = (min, max) => faker.random.number({ min, max })

class MonthlyBudgetFactory extends Factory {
  negative () {
    return this.params({
      budgeted: randInt(20000, 40000),
      activity: randInt(50000, 80000),
    })
  }

  positive () {
    return this.params({
      budgeted: randInt(50000, 80000),
      activity: randInt(20000, 40000),
    })
  }

  zero () {
    const amount = randInt(50000, 80000)

    return this.params({
      budgeted: amount,
      activity: amount,
    })
  }
}

export default MonthlyBudgetFactory.define(({ params }) => {
  const budgeted = params.budgeted || randInt(30000, 50000)
  const activity = params.activity || randInt(20000, 80000)

  return {
    id: faker.random.uuid(),
    activity,
    budgeted,
    available: budgeted - activity,
    categoryId: faker.random.uuid(),
    categoryGroupId: faker.random.uuid(),
  }
})
