import faker from 'faker';
import { Category } from '@/types/models';
import { Factory } from 'fishery';

export default Factory.define<Category>(() => {
  return {
    budgetId: faker.datatype.uuid(),
    groupName: faker.animal.cat(),
    id: faker.datatype.uuid(),
    name: faker.commerce.product(),
  };
});
