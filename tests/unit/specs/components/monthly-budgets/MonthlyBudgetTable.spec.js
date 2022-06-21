import factories from '#/factories';
import MonthlyBudgetsTable from '@/components/monthly-budgets/MonthlyBudgetsTable';
import setupComponent from '#/setup-component';
import * as categoriesRepo from '@/repositories/categories';
import * as monthsRepo from '@/repositories/months';
import * as monthlyBudgetsRepo from '@/repositories/monthly-budgets';
import * as budgetsRepo from '@/repositories/budgets';

const budget = factories.budget.build();
const groups = factories.categoryGroup.buildList(2);
const categories = [
  factories.category.build({ groupName: groups[0].name, isRecurring: true }),
  factories.category.build({ groupName: groups[0].name, isRecurring: false }),
  // These categories will have no monthly budget
  factories.category.build({ groupName: groups[1].name, isRecurring: true }),
  factories.category.build({ groupName: groups[1].name, isRecurring: false }),
];
const monthlyBudgets = [
  factories.monthlyBudget.build({
    categoryId: categories[0].id,
    categoryGroupId: groups[0].id,
  }),
  factories.monthlyBudget.build({
    categoryId: categories[1].id,
    categoryGroupId: groups[0].id,
  }),
];
const month = factories.month.build();

const factory = () => {
  budgetsRepo.openBudget.value = budget;
  categoriesRepo.categories.value = categories;
  monthlyBudgetsRepo.monthlyBudgets.value = monthlyBudgets;
  monthsRepo.currentMonth.value = month;

  return setupComponent(MonthlyBudgetsTable);
};

describe('MonthlyBudgetsTable', () => {
  it('renders a row for each existing monthly budget', async () => {
    const wrapper = factory();
    const items = wrapper.findAllComponents("[data-test='row']");

    expect(items.length).toEqual(3);
    expect(items[0].props()).toMatchObject({
      category: categories[0],
      monthlyBudget: monthlyBudgets[0],
    });
    expect(items[1].props()).toMatchObject({
      category: categories[1],
      monthlyBudget: monthlyBudgets[1],
    });
  });

  it('renders a row for each recurring category with no monthly budget yet', () => {
    const wrapper = factory();
    const items = wrapper.findAllComponents("[data-test='row']");

    expect(items[2].props()).toMatchObject({
      category: categories[2],
      monthlyBudget: {
        id: '',
        activity: 0,
        available: 0,
        budgeted: 0,
        categoryId: categories[2].id,
        categoryGroupId: '',
        monthId: month.id,
      },
    });
  });

  it('does not show details drawer by default', () => {
    const wrapper = factory();
    const item = wrapper.findComponent("[data-test='details']");

    expect(item.props().show).toBeFalsy();
  });

  describe('when row is selected', () => {
    it('opens details drawer with selected monthly budget', async () => {
      const wrapper = factory();

      await wrapper.findComponent("[data-test='row']").vm.$emit('select');

      const item = wrapper.findComponent("[data-test='details']");

      expect(item.props().show).toBeTruthy();
      expect(item.props().monthlyBudget).toEqual(monthlyBudgets[0]);
    });

    describe('and drawer emits close', () => {
      it('hides drawer', async () => {
        const wrapper = factory();

        await wrapper.findComponent("[data-test='row']").vm.$emit('select');

        const item = wrapper.findComponent("[data-test='details']");
        expect(item.props().show).toBeTruthy();

        await item.vm.$emit('close');
        expect(item.props().show).toBeFalsy();
      });
    });
  });
});
