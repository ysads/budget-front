import faker from 'faker'
import { Factory } from 'fishery'

export default Factory.define(() => {
  return {
    email: faker.internet.email(),
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
  }
})
