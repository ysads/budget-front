<template>
  <section class="monthly-budgets-table">
    <monthly-budget-row
      v-for="monthlyBudget in monthlyBudgetsIncludingFakes"
      :key="monthlyBudget.id"
      class="monthly-budgets-table__row"
      :budget="openBudget"
      :category="categoryById(monthlyBudget.categoryId)"
      :monthly-budget="monthlyBudget"
      data-test="row"
      @select="openDrawer(monthlyBudget)"
    />
    <monthly-budget-details
      :show="isDrawerOpen"
      :monthly-budget="openMonthlyBudget"
      data-test="details"
      @close="closeDrawer"
    />
  </section>
</template>

<script lang="ts">
import { categories, categoryById } from '@/repositories/categories';
import { computed, defineComponent, ref } from 'vue';
import { Category, MonthlyBudget } from '@/types/models';
import { monthlyBudgets } from '@/repositories/monthly-budgets';
import { openBudget } from '@/repositories/budgets';
import MonthlyBudgetDetails from '@/components/monthly-budgets/MonthlyBudgetDetails.vue';
import MonthlyBudgetRow from '@/components/monthly-budgets/MonthlyBudgetRow.vue';
import { currentMonth } from '@/repositories/months';

const fakeMonthlyBudget = (category: Category): MonthlyBudget => ({
  id: '',
  activity: 0,
  available: 0,
  budgeted: 0,
  categoryId: category.id,
  categoryGroupId: '',
  monthId: currentMonth.value.id,
});

export default defineComponent({
  name: 'MonthlyBudgetsTable',

  components: {
    MonthlyBudgetDetails,
    MonthlyBudgetRow,
  },

  setup() {
    const openMonthlyBudget = ref({} as MonthlyBudget);
    const isDrawerOpen = ref(false);

    const recurringCategoriesWithoutMonthlyBudget = computed(() =>
      categories.value.filter(
        (c) =>
          c.isRecurring &&
          monthlyBudgets.value.findIndex((m) => m.categoryId === c.id) === -1,
      ),
    );

    const monthlyBudgetsIncludingFakes = computed(() => {
      const fakeMonthlyBudgets =
        recurringCategoriesWithoutMonthlyBudget.value.map((c) =>
          fakeMonthlyBudget(c),
        );

      return monthlyBudgets.value.concat(fakeMonthlyBudgets);
    });

    const openDrawer = (mb: MonthlyBudget) => {
      isDrawerOpen.value = true;
      openMonthlyBudget.value = mb;
    };
    const closeDrawer = () => {
      isDrawerOpen.value = false;
      openMonthlyBudget.value = {} as MonthlyBudget;
    };

    return {
      categoryById,
      closeDrawer,
      isDrawerOpen,
      monthlyBudgets,
      openBudget,
      openDrawer,
      openMonthlyBudget,
      monthlyBudgetsIncludingFakes,
      recurringCategoriesWithoutMonthlyBudget,
    };
  },
});
</script>

<style lang="scss" scoped>
.monthly-budgets-table {
  &__row {
    border-bottom-color: var(--row-separator);
    border-bottom-style: solid;
    border-bottom-width: 1px;
  }
}
</style>
