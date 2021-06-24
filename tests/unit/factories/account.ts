import random from 'lodash/random';
import uuid from 'uuid-random';
import faker from 'faker';
import { ACCOUNT_TYPES } from '@/constants/account';
import { Factory } from 'fishery';
import { Account, AccountNature } from '@/types/models';
import { sample } from '@/support/collection';

const ACCOUNT_NATURES: AccountNature[] = ['budget', 'tracking'];

class AccountFactory extends Factory<Account> {
  budget() {
    return this.params({ nature: 'budget' as AccountNature });
  }

  tracking() {
    return this.params({ nature: 'tracking' as AccountNature });
  }
}

export default AccountFactory.define(() => {
  const balance = random(-10000, 60000);
  const clearedBalance = random(-10000, 60000);

  return {
    id: uuid(),
    balance: balance,
    budgetId: uuid(),
    clearedBalance: clearedBalance,
    closedAt: null,
    nature: sample(ACCOUNT_NATURES),
    name: faker.finance.accountName(),
    type: sample(ACCOUNT_TYPES),
    unclearedBalance: balance - clearedBalance,
  };
});
