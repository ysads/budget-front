import AccountShow from '@/views/dashboard/AccountShow';
import factories from '#/factories';
import flushPromises from 'flush-promises';
import alert from '@/support/alert';
import setupComponent from '#/setup-component';
import * as budgetsRepository from '@/repositories/budgets';
import * as accountsRepository from '@/repositories/accounts';
import * as transactionsRepository from '@/repositories/transactions';

jest.mock('@/support/alert', () => ({
  error: jest.fn(),
}));

const openBudget = factories.budget.build();
const accounts = factories.account.buildList(3);
const selectedAccount = accounts[0];

const factory = (args = {}) =>
  setupComponent(AccountShow, {
    route: {
      params: { id: selectedAccount.id },
    },
    ...args,
  });

describe('AccountShow', () => {
  beforeEach(() => {
    budgetsRepository.openBudget.value = openBudget;
    accountsRepository.accounts.value = accounts;
    transactionsRepository.getTransactions = jest.fn();
  });

  it('renders AccountHeader with selected account data as props', async () => {
    const wrapper = factory();

    await flushPromises();
    const item = wrapper.findComponent("[data-test='header']");

    expect(item.props()).toEqual({
      budget: openBudget,
      cleared: selectedAccount.clearedBalance,
      uncleared: selectedAccount.unclearedBalance,
      name: selectedAccount.name,
    });
  });

  it('renders AccountToolbar using selected account', async () => {
    const wrapper = factory();

    await flushPromises();
    const item = wrapper.findComponent("[data-test='toolbar']");

    expect(item.props()).toEqual({ account: selectedAccount });
  });

  it('fetches transactions from api', async () => {
    factory();

    await flushPromises();

    expect(transactionsRepository.getTransactions).toHaveBeenCalledWith({
      budgetId: openBudget.id,
      originId: selectedAccount.id,
    });
  });

  describe('when there is not an account with such id', () => {
    it('redirects to AllAccounts page', async () => {
      const router = { push: jest.fn() };
      factory({
        route: { params: { id: 'other-id' } },
        router,
      });

      await flushPromises();

      expect(router.push).toHaveBeenCalledWith({ name: 'AllAccounts' });
    });

    it('alerts user', async () => {
      factory({
        route: { params: { id: 'other-id' } },
      });

      await flushPromises();

      expect(alert.error).toHaveBeenCalledWith('errors.accounts.not-found');
    });
  });
});
