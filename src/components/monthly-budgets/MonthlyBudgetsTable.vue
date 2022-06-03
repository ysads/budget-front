<template>
  <section class="monthly-budgets-table">
    <div
      v-for="(monthlyBudgets, groupId) in monthlyBudgetsByCategoryGroup"
      :key="groupId"
      class="monthly-budgets__item"
    >
      <monthly-budget-header
        :budget="openBudget"
        :category-group="categoryGroupById(groupId)"
        :monthly-budgets="monthlyBudgets"
        data-test="header"
      />

      <ul>
        <monthly-budget-row
          v-for="monthlyBudget in monthlyBudgets"
          :key="monthlyBudget.id"
          class="monthly-budgets-table__row"
          :budget="openBudget"
          :category="categoryById(monthlyBudget.categoryId)"
          :monthly-budget="monthlyBudget"
          data-test="row"
          @click="openDrawer(monthlyBudget)"
        />
      </ul>
    </div>

    <monthly-budget-details
      :show="isDrawerOpen"
      :monthly-budget="openMonthlyBudget"
      data-test="details"
      @close="closeDrawer"
    />
  </section>
</template>

<script lang="ts">
import { categoryById } from '@/repositories/categories';
import { categoryGroupById } from '@/repositories/category-groups';
import { computed, defineComponent, ref } from 'vue';
import { MonthlyBudget } from '@/types/models';
import { monthlyBudgetsByCategoryGroup } from '@/repositories/monthly-budgets';
import { openBudget } from '@/repositories/budgets';
import MonthlyBudgetDetails from '@/components/monthly-budgets/MonthlyBudgetDetails.vue';
import MonthlyBudgetHeader from '@/components/monthly-budgets/MonthlyBudgetHeader.vue';
import MonthlyBudgetRow from '@/components/monthly-budgets/MonthlyBudgetRow.vue';

export default defineComponent({
  name: 'MonthlyBudgetsTable',

  components: {
    MonthlyBudgetDetails,
    MonthlyBudgetHeader,
    MonthlyBudgetRow,
  },

  setup() {
    const openMonthlyBudget = ref<MonthlyBudget | Record<string, unknown>>({});
    const isDrawerOpen = computed(() => Boolean(openMonthlyBudget.value.id));

    const openDrawer = (mb: MonthlyBudget) => (openMonthlyBudget.value = mb);
    const closeDrawer = () => (openMonthlyBudget.value = {});

    return {
      categoryById,
      categoryGroupById,
      closeDrawer,
      isDrawerOpen,
      monthlyBudgetsByCategoryGroup,
      openBudget,
      openDrawer,
      openMonthlyBudget,
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
