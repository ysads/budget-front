import accountFactory from './account';
import faker from 'faker';
import payeeFactory from './payee';
import { Factory } from 'fishery';
import { Transaction } from '@/types/models';
import { sample } from '@/support/collection';

export default Factory.define<Transaction>(() => {
  const amount = faker.datatype.number();

  return {
    amount,
    clearedAt: faker.datatype.datetime().toISOString(),
    categoryId: faker.datatype.uuid(),
    destinationId: faker.datatype.uuid(),
    id: faker.datatype.uuid(),
    memo: faker.lorem.sentence(),
    monthlyBudgetId: faker.datatype.uuid(),
    referenceAt: faker.datatype.datetime().toISOString(),
    payee: payeeFactory.build(),
    payeeName: faker.name.findName(),
    origin: accountFactory.build(),
    originId: faker.datatype.uuid(),
    outflow: sample([true, false]),
    unsignedAmount: Math.abs(amount),
  };
});
