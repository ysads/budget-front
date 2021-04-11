import Faker from 'faker'
import { Factory } from 'fishery'

export default Factory.define(() => {
  return {
    categoryGroupId: Faker.datatype.uuid(),
    id: Faker.datatype.uuid(),
    name: Faker.commerce.product(),
  }
})
