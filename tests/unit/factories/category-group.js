import Faker from 'faker'
import { Factory } from 'fishery'

export default Factory.define(() => {
  return {
    budgetId: Faker.datatype.uuid(),
    id: Faker.datatype.uuid(),
    name: Faker.commerce.productMaterial(),
  }
})
