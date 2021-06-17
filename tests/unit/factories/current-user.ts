import faker from 'faker';
import { User } from '@/types/models';
import { Factory } from 'fishery';

export default Factory.define<User>(() => {
  return {
    defaultBudgetId: faker.datatype.uuid(),
    email: faker.internet.email(),
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
  };
});
