import accountFactory from './account';
import faker from 'faker';
import { Factory } from 'fishery';
import { Transfer } from '@/types/models';
import { sample } from '@/support/collection';

export default Factory.define<Transfer>(() => {
  const amount = faker.datatype.number();

  return {
    account: accountFactory.build(),
    accountId: faker.datatype.uuid(),
    amount,
    clearedAt: faker.datatype.datetime().toISOString(),
    categoryId: faker.datatype.uuid(),
    destinationId: faker.datatype.uuid(),
    id: faker.datatype.uuid(),
    linkedTransactionId: faker.datatype.uuid(),
    linkedTransactionAccountId: faker.datatype.uuid(),
    memo: faker.lorem.sentence(),
    monthlyBudgetId: faker.datatype.uuid(),
    referenceAt: faker.datatype.datetime().toISOString(),
    payee: null,
    payeeName: null,
    outflow: sample([true, false]),
    unsignedAmount: Math.abs(amount),
  };
});
