import faker from 'faker';
import { Category } from '@/types/models';
import { Factory } from 'fishery';
import { sample } from '@/support/collection';

export default Factory.define<Category>(() => {
  return {
    budgetId: faker.datatype.uuid(),
    groupName: faker.animal.cat(),
    id: faker.datatype.uuid(),
    isRecurring: sample([true, false]),
    name: faker.commerce.product(),
  };
});
