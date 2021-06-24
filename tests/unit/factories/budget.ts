import currencies, { Currency } from '@/support/currencies';
import uuid from 'uuid-random';
import faker from 'faker';
import { Factory } from 'fishery';
import { Budget } from '@/types/models';
import { sample } from '@/support/collection';

export default Factory.define<Budget>(() => {
  return {
    id: uuid(),
    currency: sample(Object.keys(currencies)) as Currency,
    dateFormat: 'dd-MM-YYYY',
    name: faker.finance.accountName(),
  };
});
