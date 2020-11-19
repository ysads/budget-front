import Faker from 'faker'
import { Factory } from 'fishery'

export default Factory.define(() => {
  return {
    categoryGroupId: Faker.random.uuid(),
    id: Faker.random.uuid(),
    name: Faker.commerce.product(),
  }
})
