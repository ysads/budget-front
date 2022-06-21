import factories from '#/factories';
import MonthlyBudgetRow from '@/components/monthly-budgets/MonthlyBudgetRow';
import setupComponent from '#/setup-component';
import { currencySettings, format } from '@/support/money';

const budget = factories.budget.build();
const category = factories.category.build();
const monthlyBudget = factories.monthlyBudget.build();
const moneySettings = currencySettings(budget);

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

  it('renders available amount localized', () => {
    const wrapper = factory();
    const item = wrapper.find("[data-test='available']");

    expect(item.text()).toEqual(format(monthlyBudget.available, moneySettings));
  });

  describe('when there is nothing budgeted for this category', () => {
    it('renders spent text reflecting that', () => {
      const monthlyBudget = factories.monthlyBudget.build({ budgeted: 0 });
      const wrapper = factory({ monthlyBudget });
      const item = wrapper.find("[data-test='spent']");

      expect(item.text()).toMatch(/notBudgeted/);
      expect(item.text()).toMatch(
        format(monthlyBudget.activity, moneySettings),
      );
    });
  });

  describe('when there is nothing budgeted for this category', () => {
    it('renders spent text reflecting that', () => {
      const monthlyBudget = factories.monthlyBudget.build({ budgeted: 50_00 });
      const wrapper = factory({ monthlyBudget });
      const item = wrapper.find("[data-test='spent']");

      expect(item.text()).toMatch(/spent/);
      expect(item.text()).toMatch(
        format(monthlyBudget.activity, moneySettings),
      );
    });
  });

  describe('when base element is clicked', () => {
    it('emits select', async () => {
      const wrapper = factory();

      await wrapper.find("[data-test='row']").trigger('click');

      expect(wrapper.emitted().select).toBeTruthy();
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

    it('renders a red progress bar', () => {
      const wrapper = factory({
        monthlyBudget: factories.monthlyBudget.negative().build(),
      });
      const item = wrapper.findComponent("[data-test='progress']");

      expect(item.props().color).toEqual('red');
    });

    it('renders a progress bar with 100% done', () => {
      const wrapper = factory({
        monthlyBudget: factories.monthlyBudget.negative().build(),
      });
      const item = wrapper.findComponent("[data-test='progress']");

      expect(item.props().value).toEqual(100);
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

    it('renders a blue progress bar', () => {
      const wrapper = factory({
        monthlyBudget: factories.monthlyBudget.positive().build(),
      });
      const item = wrapper.findComponent("[data-test='progress']");

      expect(item.props().color).toEqual('blue');
    });

    it('renders a progress bar with ratio between activity and budgeted rounded to nearest integer', () => {
      const monthlyBudget = factories.monthlyBudget.positive().build();
      const wrapper = factory({ monthlyBudget });
      const item = wrapper.findComponent("[data-test='progress']");

      expect(item.props().value).toEqual(
        Math.round((monthlyBudget.activity * 100) / monthlyBudget.budgeted),
      );
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

    it('renders a green progress bar', () => {
      const wrapper = factory({
        monthlyBudget: factories.monthlyBudget.zero().build(),
      });
      const item = wrapper.findComponent("[data-test='progress']");

      expect(item.props().color).toEqual('green');
    });

    it('renders a progress bar with 100% done', () => {
      const wrapper = factory({
        monthlyBudget: factories.monthlyBudget.zero().build(),
      });
      const item = wrapper.findComponent("[data-test='progress']");

      expect(item.props().value).toEqual(100);
    });
  });
});
