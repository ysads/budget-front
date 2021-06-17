import factories from '#/factories';
import MonthlyBudgetHeader from '@/components/monthly-budgets/MonthlyBudgetHeader';
import setupComponent from '#/setup-component';
import { localize } from '@/support/money';

const budget = factories.budget.build();
const categoryGroup = factories.categoryGroup.build();
const monthlyBudgets = factories.monthlyBudget.buildList(2);

const factory = (args = {}) =>
  setupComponent(MonthlyBudgetHeader, {
    props: {
      budget,
      categoryGroup,
      monthlyBudgets,
      ...args,
    },
  });

describe('MonthlyBudgetHeader', () => {
  it('renders category name', () => {
    const wrapper = factory();
    const item = wrapper.find("[data-test='category-group-name']");

    expect(item.text()).toEqual(categoryGroup.name);
  });

  it('renders budgeted amount localized', () => {
    const wrapper = factory();
    const item = wrapper.find("[data-test='budgeted']");

    const total = monthlyBudgets[0].budgeted + monthlyBudgets[1].budgeted;

    expect(item.text()).toEqual(localize(total, budget));
  });

  it('renders activity amount localized', () => {
    const wrapper = factory();
    const item = wrapper.find("[data-test='activity']");

    const total = monthlyBudgets[0].activity + monthlyBudgets[1].activity;

    expect(item.text()).toEqual(localize(total, budget));
  });

  it('renders available amount localized', () => {
    const wrapper = factory();
    const item = wrapper.find("[data-test='available']");

    const total = monthlyBudgets[0].available + monthlyBudgets[1].available;

    expect(item.text()).toEqual(localize(total, budget));
  });
});
