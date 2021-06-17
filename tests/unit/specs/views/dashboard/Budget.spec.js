import Budget from '@/views/dashboard/Budget';
import factories from '#/factories';
import flushPromises from 'flush-promises';
import MockDate from 'mockdate';
import setupComponent from '#/setup-component';
import { isoMonth } from '@/support/date';
import * as budgetsRepository from '@/repositories/budgets';
import * as monthsRepository from '@/repositories/months';
import * as monthlyBudgetsRepository from '@/repositories/monthly-budgets';

const month = factories.month.build();
const budget = factories.budget.build();

const router = { push: jest.fn() };
const route = { params: { isoMonth: '2021-05' } };

const factory = (args = {}) =>
  setupComponent(Budget, {
    route,
    router,
    ...args,
  });

describe('Budget', () => {
  beforeEach(() => {
    MockDate.set('2021-03-15');

    budgetsRepository.openBudget.value = budget;
    monthsRepository.currentMonth.value = month;

    monthsRepository.getMonthByIso = jest.fn();
    monthlyBudgetsRepository.getMonthlyBudgets = jest.fn();
  });

  it('renders loading initially', async () => {
    const wrapper = factory();

    expect(
      wrapper.findComponent("[data-test='loading']").exists(),
    ).toBeTruthy();

    await flushPromises();

    expect(wrapper.findComponent("[data-test='loading']").exists()).toBeFalsy();
  });

  it('renders header', async () => {
    const wrapper = factory();

    await flushPromises();

    const item = wrapper.findComponent("[data-test='month-header']");

    expect(item.exists()).toBeTruthy();
  });

  it('renders budget toolbar', async () => {
    const wrapper = factory();

    await flushPromises();

    const item = wrapper.findComponent("[data-test='toolbar']");

    expect(item.exists()).toBeTruthy();
  });

  it('renders monthly budgets table', async () => {
    const wrapper = factory();

    await flushPromises();

    const item = wrapper.findComponent("[data-test='table']");

    expect(item.exists()).toBeTruthy();
  });

  it('fetches month using using isoMonth param and budget', async () => {
    factory();

    await flushPromises();

    expect(monthsRepository.getMonthByIso).toHaveBeenCalledWith({
      isoMonth: '2021-05',
      budgetId: budget.id,
    });
  });

  it('fetches monthly budgets using isoMonth param and budget', async () => {
    factory();

    await flushPromises();

    expect(monthlyBudgetsRepository.getMonthlyBudgets).toHaveBeenCalledWith({
      isoMonth: '2021-05',
      budgetId: budget.id,
    });
  });

  describe('when there is no isoMonth param', () => {
    it('uses current month as isoMonth', async () => {
      factory({ route: { params: {} } });

      await flushPromises();

      expect(monthlyBudgetsRepository.getMonthlyBudgets).toHaveBeenCalledWith({
        isoMonth: '2021-03',
        budgetId: budget.id,
      });
    });
  });

  describe('when month header emits update', () => {
    it('navigates to MonthBudget route using updated date', async () => {
      const date = new Date();
      const wrapper = factory();

      await flushPromises();

      await wrapper
        .findComponent("[data-test='month-header']")
        .vm.$emit('update', date);

      expect(router.push).toHaveBeenCalledWith({
        name: 'MonthBudget',
        params: { isoMonth: isoMonth(date) },
      });
    });
  });
});
