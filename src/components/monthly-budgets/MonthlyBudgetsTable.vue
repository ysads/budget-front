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
        />
      </ul>
    </div>
  </section>
</template>

<script>
import { categoryById } from '@/repositories/categories'
import { categoryGroupById } from '@/repositories/category-groups'
import { monthlyBudgetsByCategoryGroup } from '@/repositories/monthly-budgets'
import { openBudget } from '@/repositories/budgets'
import MonthlyBudgetHeader from '@/components/monthly-budgets/MonthlyBudgetHeader'
import MonthlyBudgetRow from '@/components/monthly-budgets/MonthlyBudgetRow'

export default {
  name: 'MonthlyBudgetsTable',

  components: {
    MonthlyBudgetHeader,
    MonthlyBudgetRow,
  },

  setup () {
    return {
      categoryById,
      categoryGroupById,
      monthlyBudgetsByCategoryGroup,
      openBudget,
    }
  },
}
</script>

<style lang="scss" scoped>
.monthly-budgets-table {
  &__row + &__row {
    border-top: 1px solid var(--table-separator);
  }
}
</style>
