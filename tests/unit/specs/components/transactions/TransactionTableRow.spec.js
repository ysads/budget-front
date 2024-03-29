import factories from '#/factories';
import TransactionTableRow from '@/components/transactions/TransactionTableRow';
import setupComponent from '#/setup-component';
import { localize } from '@/support/money';
import * as categoriesRepo from '@/repositories/categories';
import * as categoryGroupsRepo from '@/repositories/category-groups';

const budget = factories.budget.build();
const categoryGroup = factories.categoryGroup.build();
const category = factories.category.build({
  categoryGroupId: categoryGroup.id,
});
const transaction = factories.transaction.build({
  categoryId: category.id,
});

const newTransaction = (params) =>
  factories.transaction.build({
    categoryId: category.id,
    ...params,
  });

const factory = (args = {}) =>
  setupComponent(TransactionTableRow, {
    props: {
      budget,
      transaction,
      ...args,
    },
  });

describe.skip('TransactionTableRow', () => {
  beforeEach(() => {
    categoriesRepo.categories.value = [category];
    categoryGroupsRepo.categoryGroups.value = [categoryGroup];
  });

  it('renders category name', () => {
    const wrapper = factory();
    const item = wrapper.find("[data-test='category']");

    expect(item.text()).toEqual(`${categoryGroup.name}: ${category.name}`);
  });

  it('renders payee', () => {
    const wrapper = factory();
    const item = wrapper.find("[data-test='payee']");

    expect(item.text()).toEqual(transaction.payeeName);
  });

  it('renders reference date', () => {
    const wrapper = factory();
    const item = wrapper.find("[data-test='date']");

    expect(item.text()).toMatch(new Date(transaction.referenceAt).toString());
  });

  it('renders localized amount', () => {
    const wrapper = factory();
    const item = wrapper.find("[data-test='amount']");

    expect(item.text()).toEqual(localize(transaction.amount, budget));
  });

  it('renders memo text', () => {
    const wrapper = factory();
    const item = wrapper.find("[data-test='memo']");

    expect(item.text()).toEqual(transaction.memo);
  });

  describe('when transaction is cleared', () => {
    it('renders a green check icon', () => {
      const wrapper = factory({
        transaction: newTransaction({ clearedAt: new Date().toString() }),
      });
      const item = wrapper.findComponent("[data-test='cleared-icon']");

      expect(item.props()).toMatchObject({
        color: 'green',
        name: 'check',
      });
    });
  });

  describe('when transaction is not cleared', () => {
    it('renders a disabled-color clock icon', () => {
      const wrapper = factory({
        transaction: newTransaction({ clearedAt: null }),
      });
      const item = wrapper.findComponent("[data-test='cleared-icon']");

      expect(item.props()).toMatchObject({
        color: 'disabled',
        name: 'clock',
      });
    });
  });

  describe('when clicked', () => {
    it('emits click', async () => {
      const wrapper = factory();

      await wrapper.find('div').trigger('click');

      expect(wrapper.emitted().click).toBeTruthy();
    });
  });
});
