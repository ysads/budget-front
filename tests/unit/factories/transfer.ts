import accountFactory from './account';
import faker from 'faker';
import { Factory } from 'fishery';
import { Transfer } from '@/types/models';
import { sample } from '@/support/collection';

class TransferFactory extends Factory<Transfer> {
  origin() {
    const amount = faker.datatype.number({ min: -1_000_00, max: 0 });

    return this.params({
      amount,
      outflow: true,
      unsignedAmount: Math.abs(amount),
    });
  }

  destination() {
    const amount = faker.datatype.number({ min: 0, max: 1_000_00 });

    return this.params({
      amount,
      outflow: false,
      unsignedAmount: Math.abs(amount),
    });
  }
}

export default TransferFactory.define(({ params }) => {
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
    outflow: sample([true, false]),
    payee: null,
    payeeName: null,
    referenceAt: faker.datatype.datetime().toISOString(),
    unsignedAmount: Math.abs(amount),
    ...params,
  };
});
