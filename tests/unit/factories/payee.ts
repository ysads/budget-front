import faker from 'faker';
import { Payee } from '@/types/models';
import { Factory } from 'fishery';

export default Factory.define<Payee>(() => {
  return {
    budgetId: faker.datatype.uuid(),
    id: faker.datatype.uuid(),
    name: faker.commerce.product(),
  };
});
