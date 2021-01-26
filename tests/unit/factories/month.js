import sample from 'lodash/sample'
import Faker from 'faker'
import { Factory } from 'fishery'

const randomMonth = () => {
  const years = [2019, 2020, 2021]
  const month = Faker.random.number({ min: 1, max: 12 })
  const formattedMonth = (month < 10) ? `0${month}` : month

  return `${sample(years)}-${formattedMonth}`
}

export default Factory.define(() => {
  return {
    id: Faker.random.uuid(),
    activity: Faker.random.number(6500),
    income: Faker.random.number(5000),
    isoMonth: randomMonth(),
    toBeBudgeted: Faker.random.number(6000),
  }
})
