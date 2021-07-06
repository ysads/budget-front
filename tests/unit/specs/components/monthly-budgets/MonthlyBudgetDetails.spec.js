import * as budgetsRepository from '@/repositories/budgets';
import * as categoriesRepository from '@/repositories/categories';
import * as categoryGroupsRepository from '@/repositories/category-groups';
import * as monthlyBudgetRepository from '@/repositories/monthly-budgets';
import * as monthsRepository from '@/repositories/months';
import alert from '@/support/alert';
import factories from '#/factories';
import flushPromises from 'flush-promises';
import MonthlyBudgetDetails from '@/components/monthly-budgets/MonthlyBudgetDetails';
import setupComponent from '#/setup-component';
import { handleApiError } from '@/api/errors';

jest.mock('@/api/errors', () => ({
  handleApiError: jest.fn(),
}));

jest.mock('@/support/alert', () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

const openBudget = factories.budget.build();
const currentMonth = factories.month.build();
const monthlyBudget = factories.monthlyBudget.build();

const categoryGroups = factories.categoryGroup.buildList(2);
const categories = [
  factories.category.build({ categoryGroupId: categoryGroups[0].id }),
  factories.category.build({ categoryGroupId: categoryGroups[1].id }),
];

monthlyBudgetRepository.createMonthlyBudget = jest.fn();
monthlyBudgetRepository.updateMonthlyBudget = jest.fn();
categoryGroupsRepository.categoryGroups.value = categoryGroups;
categoriesRepository.categories.value = categories;
monthsRepository.currentMonth.value = currentMonth;
budgetsRepository.openBudget.value = openBudget;

const factory = (args = {}) =>
  setupComponent(MonthlyBudgetDetails, {
    props: {
      monthlyBudget: args.monthlyBudget || undefined,
      show: true,
    },
    withMount: true,
  });

describe('MonthlyBudgetDetails', () => {
  it('renders budgeted input', () => {
    const wrapper = factory();

    const item = wrapper.findComponent("[data-test='budgeted']");

    expect(item.props().label).toEqual('MonthlyBudgetDetails.budgeted');
  });

  it('renders category select', () => {
    const wrapper = factory();

    const item = wrapper.findComponent("[data-test='category']");

    expect(item.props().placeholder).toEqual(
      'MonthlyBudgetDetails.categoryPlaceholder',
    );
    expect(item.props().label).toEqual('MonthlyBudgetDetails.category');
  });

  describe('when save button emits click', () => {
    it('creates a new monthly budget', async () => {
      const wrapper = factory();

      await wrapper.findComponent("[data-test='save-btn']").vm.$emit('click');

      expect(monthlyBudgetRepository.createMonthlyBudget).toHaveBeenCalled();
    });

    it('emits close', async () => {
      const wrapper = factory();

      await wrapper.findComponent("[data-test='save-btn']").vm.$emit('click');

      expect(wrapper.emitted().close).toBeTruthy();
    });

    it('alerts an success', async () => {
      const wrapper = factory();

      await wrapper.findComponent("[data-test='save-btn']").vm.$emit('click');

      expect(alert.success).toHaveBeenCalledWith(
        expect.stringMatching(/created/),
      );
    });

    describe('and request fails', () => {
      it('handles api error', async () => {
        const wrapper = factory();
        const error = new Error();

        monthlyBudgetRepository.createMonthlyBudget.mockResolvedValueOnce(
          Promise.reject(error),
        );

        await wrapper.findComponent("[data-test='save-btn']").vm.$emit('click');

        await flushPromises();

        expect(handleApiError).toHaveBeenCalledWith(error);
      });
    });
  });

  describe('when monthly budget prop is present', () => {
    it('renders select disabled', () => {
      const wrapper = factory({ monthlyBudget });
      const item = wrapper.findComponent("[data-test='category']");

      expect(item.props().disabled).toBeTruthy();
    });

    describe('and save button emits click', () => {
      it('updates monthly budget', async () => {
        const wrapper = factory({ monthlyBudget, withMount: true });

        await wrapper.findComponent("[data-test='save-btn']").vm.$emit('click');

        expect(monthlyBudgetRepository.updateMonthlyBudget).toBeCalled();
      });

      it('alerts an success', async () => {
        const wrapper = factory({ monthlyBudget, withMount: true });

        await wrapper.findComponent("[data-test='save-btn']").vm.$emit('click');

        expect(alert.success).toHaveBeenCalledWith(
          expect.stringMatching(/updated/),
        );
      });
    });
  });
});
