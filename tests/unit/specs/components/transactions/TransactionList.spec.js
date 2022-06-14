import factories from '#/factories';
import TransactionList from '@/components/transactions/TransactionList';
import setupComponent from '#/setup-component';
import * as budgetsRepo from '@/repositories/budgets';

const transactions = factories.transaction.buildList(2);
const budget = factories.budget.build();

const factory = () =>
  setupComponent(TransactionList, {
    props: {
      transactions,
    },
  });

describe('TransactionList', () => {
  beforeEach(() => {
    budgetsRepo.openBudget.value = budget;
  });

  it('renders drawer hidden by default', () => {
    const wrapper = factory();
    const drawer = wrapper.findComponent('[data-test="transaction-details"]');

    expect(drawer.props().show).toEqual(false);
  });

  it('renders a TransactionTableRow for each transaction', () => {
    const wrapper = factory();
    const items = wrapper.findAll("[data-test='table-row']");

    expect(items.length).toEqual(transactions.length);
  });

  describe('when any item emits select', () => {
    it('shows details for the correct transaction', async () => {
      const wrapper = factory();
      const drawer = wrapper.findComponent('[data-test="transaction-details"]');

      // INFO: ensure is the second transaction to be passed
      await wrapper
        .findAllComponents("[data-test='table-row']")[1]
        .vm.$emit('select');

      expect(drawer.props().transaction).toEqual(transactions[1]);
    });

    it('shows drawer', async () => {
      const wrapper = factory();
      const drawer = wrapper.findComponent('[data-test="transaction-details"]');

      await wrapper.findComponent("[data-test='table-row']").vm.$emit('select');

      expect(drawer.props().show).toEqual(true);
    });

    it('hides drawer when it emits close', async () => {
      const wrapper = factory();
      const drawer = wrapper.findComponent('[data-test="transaction-details"]');

      await wrapper.findComponent("[data-test='table-row']").vm.$emit('select');
      await drawer.vm.$emit('close');

      expect(drawer.props().show).toEqual(false);
    });
  });
});
