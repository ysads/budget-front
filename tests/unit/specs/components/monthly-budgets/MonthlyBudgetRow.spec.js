import factories from '#/factories';
import MonthlyBudgetRow from '@/components/monthly-budgets/MonthlyBudgetRow';
import setupComponent from '#/setup-component';
import { localize } from '@/support/money';

const budget = factories.budget.build();
const category = factories.category.build();
const monthlyBudget = factories.monthlyBudget.build();

const factory = (args = {}) =>
  setupComponent(MonthlyBudgetRow, {
    props: {
      budget,
      category,
      monthlyBudget,
      ...args,
    },
  });

describe('MonthlyBudgetRow', () => {
  it('renders category name', () => {
    const wrapper = factory();
    const item = wrapper.find("[data-test='category-name']");

    expect(item.text()).toEqual(category.name);
  });

  it('renders budgeted amount localized', () => {
    const wrapper = factory();
    const item = wrapper.find("[data-test='budgeted']");

    expect(item.text()).toEqual(localize(monthlyBudget.budgeted, budget));
  });

  it('renders activity amount localized', () => {
    const wrapper = factory();
    const item = wrapper.find("[data-test='activity']");

    expect(item.text()).toEqual(localize(monthlyBudget.activity, budget));
  });

  it('renders available amount localized', () => {
    const wrapper = factory();
    const item = wrapper.find("[data-test='available']");

    expect(item.text()).toEqual(localize(monthlyBudget.available, budget));
  });

  describe('when base element is clicked', () => {
    it('emits click', async () => {
      const wrapper = factory();

      await wrapper.find("[data-test='row']").trigger('click');

      expect(wrapper.emitted().click).toBeTruthy();
    });
  });

  describe('when available amount is negative', () => {
    it('renders available with negative class', () => {
      const wrapper = factory({
        monthlyBudget: factories.monthlyBudget.negative().build(),
      });
      const item = wrapper.find("[data-test='available']");

      expect(item.classes()).toContain('negative');
    });
  });

  describe('when available amount is positive', () => {
    it('renders available with positive class', () => {
      const wrapper = factory({
        monthlyBudget: factories.monthlyBudget.positive().build(),
      });
      const item = wrapper.find("[data-test='available']");

      expect(item.classes()).toContain('positive');
    });
  });

  describe('when available amount is zero', () => {
    it('renders available with zero class', () => {
      const wrapper = factory({
        monthlyBudget: factories.monthlyBudget.zero().build(),
      });
      const item = wrapper.find("[data-test='available']");

      expect(item.classes()).toContain('zero');
    });
  });
});
