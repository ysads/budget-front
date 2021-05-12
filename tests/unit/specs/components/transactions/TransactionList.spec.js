import factories from '#/factories';
import TransactionList from '@/components/transactions/TransactionList';
import setupComponent from '#/setup-component';
// import * as transactionsRepo from '@/repositories/transactions'
import * as budgetsRepo from '@/repositories/budgets';

const transactions = factories.transaction.buildList(2);
const budget = factories.budget.build();

const factory = () =>
  setupComponent(TransactionList, {
    props: {
      transactions,
    },
  });

const triggerResize = (width, height) => {
  window.innerWidth = width;
  window.innerHeight = height;
  window.dispatchEvent(new Event('resize'));
};

describe('TransactionList', () => {
  beforeEach(() => {
    budgetsRepo.openBudget.value = budget;
  });

  describe('when at mobile resolution', () => {
    beforeEach(() => {
      triggerResize(640, 480);
    });

    it('renders a TransactionCard for each transaction', () => {
      const wrapper = factory();
      const items = wrapper.findAll("[data-test='card']");

      expect(items.length).toEqual(transactions.length);
    });
  });

  describe('when at desktop resolution', () => {
    beforeEach(() => {
      triggerResize(1280, 720);
    });

    it('renders a TransactionTableHeader', () => {
      const wrapper = factory();
      const item = wrapper.find("[data-test='table-header']");

      expect(item.exists()).toBeTruthy();
    });

    it('renders a TransactionTableRow for each transaction', () => {
      const wrapper = factory();
      const items = wrapper.findAll("[data-test='table-row']");

      expect(items.length).toEqual(transactions.length);
    });
  });
});
