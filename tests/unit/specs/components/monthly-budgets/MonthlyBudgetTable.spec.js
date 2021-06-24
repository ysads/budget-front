import factories from '#/factories';
import MonthlyBudgetsTable from '@/components/monthly-budgets/MonthlyBudgetsTable';
import setupComponent from '#/setup-component';
import * as categoriesRepo from '@/repositories/categories';
import * as categoryGroupsRepo from '@/repositories/category-groups';
import * as monthlyBudgetsRepo from '@/repositories/monthly-budgets';
import * as budgetsRepo from '@/repositories/budgets';

const budget = factories.budget.build();
const categoryGroups = factories.categoryGroup.buildList(2);
const categories = [
  factories.category.build({ categoryGroupId: categoryGroups[0].id }),
  factories.category.build({ categoryGroupId: categoryGroups[0].id }),
  factories.category.build({ categoryGroupId: categoryGroups[1].id }),
  factories.category.build({ categoryGroupId: categoryGroups[1].id }), // This category will have no monthly budget
];
const monthlyBudgets = [
  factories.monthlyBudget.build({
    categoryId: categories[0].id,
    categoryGroupId: categories[0].categoryGroupId,
  }),
  factories.monthlyBudget.build({
    categoryId: categories[1].id,
    categoryGroupId: categories[1].categoryGroupId,
  }),
  factories.monthlyBudget.build({
    categoryId: categories[2].id,
    categoryGroupId: categories[2].categoryGroupId,
  }),
];

const factory = () => {
  budgetsRepo.openBudget.value = budget;
  categoriesRepo.categories.value = categories;
  categoryGroupsRepo.categoryGroups.value = categoryGroups;
  monthlyBudgetsRepo.monthlyBudgets.value = monthlyBudgets;

  return setupComponent(MonthlyBudgetsTable);
};

describe('MonthlyBudgetsTable', () => {
  it('renders a header for each category group', async () => {
    const wrapper = factory();
    const items = wrapper.findAllComponents("[data-test='header']");

    expect(items.length).toEqual(categoryGroups.length);
  });

  it('renders a row for each existing monthly budget', async () => {
    const wrapper = factory();
    const items = wrapper.findAllComponents("[data-test='row']");

    expect(items.length).toEqual(monthlyBudgets.length);
  });

  it('passes the correct monthly budgets array for each group', () => {
    const wrapper = factory();
    const items = wrapper.findAllComponents("[data-test='header']");

    expect(items[0].props()).toMatchObject({
      categoryGroup: categoryGroups[0],
      monthlyBudgets: [monthlyBudgets[0], monthlyBudgets[1]],
    });
    expect(items[1].props()).toMatchObject({
      categoryGroup: categoryGroups[1],
      monthlyBudgets: [monthlyBudgets[2]],
    });
  });

  it('passes the correct monthly budget and category for each row', () => {
    const wrapper = factory();
    const items = wrapper.findAllComponents("[data-test='row']");

    expect(items[0].props()).toMatchObject({
      category: categories[0],
      monthlyBudget: monthlyBudgets[0],
    });
    expect(items[1].props()).toMatchObject({
      category: categories[1],
      monthlyBudget: monthlyBudgets[1],
    });
    expect(items[2].props()).toMatchObject({
      category: categories[2],
      monthlyBudget: monthlyBudgets[2],
    });
  });

  it('does not show details drawer by default', () => {
    const wrapper = factory();
    const item = wrapper.findComponent("[data-test='details']");

    expect(item.exists()).toBeFalsy();
  });

  describe('when row is clicked', () => {
    it('opens details drawer with selected monthly budget', async () => {
      const wrapper = factory();

      await wrapper.findComponent("[data-test='row']").vm.$emit('click');

      const item = wrapper.findComponent("[data-test='details']");

      expect(item.exists()).toBeTruthy();
      expect(item.props().monthlyBudget).toEqual(monthlyBudgets[0]);
    });

    describe('and drawer emits close', () => {
      it('hides drawer', async () => {
        const wrapper = factory();

        await wrapper.findComponent("[data-test='row']").vm.$emit('click');
        const item = wrapper.findComponent("[data-test='details']");
        expect(item.exists()).toBeTruthy();

        await item.vm.$emit('close');
        expect(
          wrapper.findComponent("[data-test='details']").exists(),
        ).toBeFalsy();
      });
    });
  });
});
