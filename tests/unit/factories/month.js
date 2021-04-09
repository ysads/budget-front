import sample from 'lodash/sample'
import Faker from 'faker'
import { Factory } from 'fishery'

const randomMonth = () => {
  const years = [2019, 2020, 2021]
  const month = Faker.datatype.number({ min: 1, max: 12 })
  const formattedMonth = (month < 10) ? `0${month}` : month

  return `${sample(years)}-${formattedMonth}`
}

export default Factory.define(() => {
  return {
    id: Faker.datatype.uuid(),
    activity: Faker.datatype.number(6500),
    income: Faker.datatype.number(5000),
    isoMonth: randomMonth(),
    toBeBudgeted: Faker.datatype.number(6000),
  }
})
