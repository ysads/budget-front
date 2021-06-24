import BudgetToolbar from '@/components/budgets/BudgetToolbar';
import factories from '#/factories';
import setupComponent from '#/setup-component';
import * as repository from '@/repositories/budgets';

const openBudget = factories.budget.build();

const factory = () => setupComponent(BudgetToolbar, { renderSlots: true });

repository.openBudget.value = openBudget;

describe('BudgetToolbar', () => {
  it('renders new group button', () => {
    const wrapper = factory();
    const item = wrapper.find("[data-test='new-group-btn']");

    expect(item.text()).toMatch('newCategoryGroup');
  });

  it('renders new category button', () => {
    const wrapper = factory();
    const item = wrapper.find("[data-test='new-category-btn']");

    expect(item.text()).toMatch('newCategory');
  });

  it('renders new monthly budget button', () => {
    const wrapper = factory();
    const item = wrapper.find("[data-test='new-monthly-budget-btn']");

    expect(item.text()).toMatch('newMonthlyBudget');
  });

  it('does not render create group modal by default', () => {
    const wrapper = factory();
    const item = wrapper.findComponent("[data-test='new-group-modal']");

    expect(item.exists()).toBeFalsy();
  });

  it('does not render create category modal by default', () => {
    const wrapper = factory();
    const item = wrapper.findComponent("[data-test='new-category-modal']");

    expect(item.exists()).toBeFalsy();
  });

  it('does not render create monthly budget details by default', () => {
    const wrapper = factory();
    const item = wrapper.findComponent("[data-test='monthly-budget-details']");

    expect(item.exists()).toBeFalsy();
  });

  describe('when new group button is clicked', () => {
    it('shows create group modal', async () => {
      const wrapper = factory();
      await wrapper
        .findComponent("[data-test='new-category-btn']")
        .vm.$emit('click');

      const modal = wrapper.findComponent("[data-test='new-category-modal']");

      expect(modal.exists()).toBeTruthy();
    });
  });

  describe('when new category button is clicked', () => {
    it('shows create category modal', async () => {
      const wrapper = factory();
      await wrapper
        .findComponent("[data-test='new-group-btn']")
        .vm.$emit('click');

      const modal = wrapper.findComponent("[data-test='new-group-modal']");

      expect(modal.exists()).toBeTruthy();
    });
  });

  describe('when new monthly budget button is clicked', () => {
    it('shows create category modal', async () => {
      const wrapper = factory();
      await wrapper
        .findComponent("[data-test='new-monthly-budget-btn']")
        .vm.$emit('click');

      const modal = wrapper.findComponent(
        "[data-test='monthly-budget-details']",
      );

      expect(modal.exists()).toBeTruthy();
    });
  });
});
