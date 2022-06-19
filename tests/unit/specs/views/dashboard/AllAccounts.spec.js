import AllAccounts from '@/views/dashboard/AllAccounts';
import factories from '#/factories';
import setupComponent from '#/setup-component';
import * as budgetsRepository from '@/repositories/budgets';
import * as accountsRepository from '@/repositories/accounts';
import * as transactionsRepository from '@/repositories/transactions';
import flushPromises from 'flush-promises';

const openBudget = factories.budget.build();
const accounts = factories.account.buildList(1);
const transactions = factories.transaction.buildList(1);

const factory = () => setupComponent(AllAccounts);

describe('AllAccounts', () => {
  beforeEach(() => {
    budgetsRepository.openBudget.value = openBudget;
    accountsRepository.accounts.value = accounts;
    transactionsRepository.transactions.value = transactions;
    transactionsRepository.getTransactions = jest.fn();
  });

  it('renders AccountHeader with accounts totals as props', async () => {
    const wrapper = factory();
    await flushPromises();

    const item = wrapper.findComponent("[data-test='header']");

    expect(item.props()).toEqual({
      budget: openBudget,
      cleared: accounts.reduce((total, a) => total + a.clearedBalance, 0),
      uncleared: accounts.reduce((total, a) => total + a.unclearedBalance, 0),
      name: expect.stringMatching(/title/),
    });
  });

  it('renders AccountToolbar without an account account', async () => {
    const wrapper = factory();
    await flushPromises();

    const item = wrapper.findComponent("[data-test='toolbar']");

    expect(item.props().account).toBeNull();
  });

  it('renders TransactionList', async () => {
    const wrapper = factory();
    await flushPromises();

    const item = wrapper.findComponent("[data-test='transaction-list']");

    expect(item.props().transactions).toEqual(transactions);
  });

  it('fetches transactions', async () => {
    factory();
    await flushPromises();

    expect(transactionsRepository.getTransactions).toHaveBeenCalledWith({
      budgetId: openBudget.id,
    });
  });

  describe('when fetching transactions', () => {
    it('displays Loading component', async () => {
      const wrapper = factory();

      expect(wrapper.find("[data-test='loading']").exists()).toBeTruthy();

      await flushPromises();

      expect(wrapper.find("[data-test='loading']").exists()).toBeFalsy();
    });
  });
});
