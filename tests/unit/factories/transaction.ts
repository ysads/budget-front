import accountFactory from './account';
import faker from 'faker';
import payeeFactory from './payee';
import { Factory } from 'fishery';
import { Transaction } from '@/types/models';

export default Factory.define<Transaction>(() => {
  const base = {
    amount: faker.datatype.number(),
    clearedAt: faker.datatype.datetime().toISOString(),
    destinationId: faker.datatype.uuid(),
    id: faker.datatype.uuid(),
    memo: faker.lorem.sentence(),
    monthlyBudgetId: faker.datatype.uuid(),
    referenceAt: faker.datatype.datetime().toISOString(),
    payee: payeeFactory.build(),
    origin: accountFactory.build(),
  };

  return base;
});
