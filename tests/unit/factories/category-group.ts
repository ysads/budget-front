import faker from 'faker';
import { CategoryGroup } from '@/types/models';
import { Factory } from 'fishery';

export default Factory.define<CategoryGroup>(() => {
  return {
    budgetId: faker.datatype.uuid(),
    id: faker.datatype.uuid(),
    name: faker.commerce.productMaterial(),
  };
});
