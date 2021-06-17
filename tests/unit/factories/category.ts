import faker from 'faker';
import { Category } from '@/types/models';
import { Factory } from 'fishery';

export default Factory.define<Category>(() => {
  return {
    budgetId: faker.datatype.uuid(),
    categoryGroupId: faker.datatype.uuid(),
    id: faker.datatype.uuid(),
    name: faker.commerce.product(),
  };
});
