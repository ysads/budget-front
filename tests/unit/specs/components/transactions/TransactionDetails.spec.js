import alert from '@/support/alert';
import factories from '#/factories';
import MockDate from 'mockdate';
import TransactionDetails from '@/components/transactions/TransactionDetails';
import setupComponent from '#/setup-component';
import * as categoriesRepo from '@/repositories/categories';
import * as categoryGroupsRepo from '@/repositories/category-groups';
import * as budgetsRepo from '@/repositories/budgets';
import * as payeesRepo from '@/repositories/payees';
import * as accountsRepo from '@/repositories/accounts';
import * as transactionsRepository from '@/repositories/transactions';
import { handleApiError } from '@/api/errors';
import { flushPromises } from '@vue/test-utils';

jest.mock('@/api/errors', () => ({
  handleApiError: jest.fn(),
}));

jest.mock('@/support/alert', () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

const allAccounts = factories.account.buildList(2);
const account = factories.account.budget().build();
const budget = factories.budget.build();
const payees = factories.payee.buildList(2);
const categoryGroups = factories.categoryGroup.buildList(2);
const categories = [
  factories.category.build({ categoryGroupId: categoryGroups[0].id }),
  factories.category.build({ categoryGroupId: categoryGroups[0].id }),
  factories.category.build({ categoryGroupId: categoryGroups[1].id }),
];
const transaction = factories.transaction.build();

const factory = (args = {}) => {
  accountsRepo.accounts.value = allAccounts;
  budgetsRepo.openBudget.value = budget;
  categoriesRepo.categories.value = categories;
  categoryGroupsRepo.categoryGroups.value = categoryGroups;
  payeesRepo.payees.value = payees;
  transactionsRepository.createTransaction = jest.fn();

  return setupComponent(TransactionDetails, {
    props: {
      originAccount: 'account' in args ? args.account : account,
      show: true,
      transaction: args.transaction,
    },
    stubs: {
      transition: false,
    },
    withMount: true,
  });
};

describe('TransactionDetails', () => {
  beforeAll(() => MockDate.set(new Date()));
  afterAll(() => MockDate.reset());

  it('renders payee select', () => {
    const wrapper = factory();
    const item = wrapper.findComponent("[data-test='payee']");

    expect(item.props()).toMatchObject({
      options: payees.map((p) => ({ label: p.name, value: p.name })),
      allowCreate: true,
      label: expect.stringMatching(/payee/),
    });
  });

  it('renders reference-at datepicker', () => {
    const wrapper = factory();
    const item = wrapper.findComponent("[data-test='reference-at']");

    expect(item.props()).toMatchObject({
      format: budget.dateFormat,
      label: expect.stringMatching(/referenceAt/),
    });
  });

  it('renders amount input', () => {
    const wrapper = factory();
    const item = wrapper.findComponent("[data-test='amount']");

    expect(item.props()).toMatchObject({
      label: expect.stringMatching(/amount/),
    });
  });

  it('renders memo input', () => {
    const wrapper = factory();
    const item = wrapper.findComponent("[data-test='memo']");

    expect(item.props()).toMatchObject({
      label: expect.stringMatching(/memo/),
      tip: expect.stringMatching(/memoTip/),
    });
  });

  it('renders cleared-at checkbox', () => {
    const wrapper = factory();
    const item = wrapper.findComponent("[data-test='cleared-at']");

    expect(item.props()).toMatchObject({
      label: expect.stringMatching(/clearedAt/),
      tip: expect.stringMatching(/clearedAtTip/),
    });
  });

  describe('origin account select', () => {
    it('is disabled when editing', () => {
      const wrapper = factory({ transaction });
      const item = wrapper.findComponent("[data-test='origin-account']");

      expect(item.props().disabled).toBeTruthy();
    });

    it('is disabled when origin account is present', () => {
      const wrapper = factory({ account });
      const item = wrapper.findComponent("[data-test='origin-account']");

      expect(item.props().disabled).toBeTruthy();
    });

    it('is enabled otherwise', () => {
      const wrapper = factory({ account: null, transaction: {} });
      const item = wrapper.findComponent("[data-test='origin-account']");

      expect(item.props().disabled).toBeFalsy();
    });
  });

  describe('when originAccount is null', () => {
    it('renders account select', () => {
      const wrapper = factory({ account: null });
      const item = wrapper.findComponent("[data-test='origin-account']");

      expect(item.props()).toMatchObject({
        label: expect.stringMatching(/account/),
        options: allAccounts.map((a) => ({ label: a.name, value: a.id })),
      });
    });
  });

  describe('when cleared-at is checked', () => {
    it('sets form.clearedAt as true', async () => {
      const wrapper = factory();
      const item = wrapper.findComponent("[data-test='cleared-at']");

      await item.vm.$emit('update:model-value', true);

      expect(wrapper.vm.form.clearedAt).toEqual(new Date().toISOString());
    });
  });

  describe('when cleared-at is unchecked', () => {
    it('sets form.clearedAt as null', async () => {
      const wrapper = factory();
      const item = wrapper.findComponent("[data-test='cleared-at']");

      await item.vm.$emit('update:model-value', true);
      await item.vm.$emit('update:model-value', false);

      expect(wrapper.vm.form.clearedAt).toBeNull();
    });
  });

  describe('when save button emits click', () => {
    it('emits close', async () => {
      const wrapper = factory();

      await wrapper.findComponent("[data-test='save-btn']").vm.$emit('click');
      await flushPromises();

      expect(wrapper.emitted().close).toBeTruthy();
    });

    it('alerts an success', async () => {
      const wrapper = factory();

      await wrapper.findComponent("[data-test='save-btn']").vm.$emit('click');
      await flushPromises();

      expect(alert.success).toHaveBeenCalled();
    });

    describe('and request fails', () => {
      it('handles api error', async () => {
        const wrapper = factory();
        const error = new Error();

        transactionsRepository.createTransaction.mockResolvedValueOnce(
          Promise.reject(error),
        );

        await wrapper.findComponent("[data-test='save-btn']").vm.$emit('click');
        await flushPromises();

        expect(handleApiError).toHaveBeenCalledWith(error);
      });
    });
  });
});
