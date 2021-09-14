import MockDate from 'mockdate';
import factories from '#/factories';
import useTransactionForm, {
  ApiTransactionForm,
} from '@/use/forms/transaction';
import { currencySettings } from '@/support/money';
import { reactive, ref } from 'vue';
import { Account, NullishDate, Transaction } from '@/types/models';
import {
  createTransaction,
  updateTransaction,
} from '@/repositories/transactions';

jest.mock('@/repositories/transactions', () => ({
  createTransaction: jest.fn(),
  updateTransaction: jest.fn(),
}));

const account = factories.account.build();
const transaction = factories.transaction.build({
  unsignedAmount: 2550,
  outflow: true,
});
const budget = factories.budget.build();
const moneySettings = currencySettings(budget);

describe('useTransactionForm', () => {
  beforeAll(() => MockDate.set('2021-01-01'));
  afterAll(() => MockDate.reset());
});
