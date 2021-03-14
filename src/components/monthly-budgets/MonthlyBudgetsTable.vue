<template>
  <section class="monthly-budgets">
    <div
      v-for="group in categoryGroups"
      :key="group.id"
      class="monthly-budgets__item"
    >
      <header class="category-group-item" role="button">
        <span class="category-group-item__name">
          {{ group.name }}
        </span>
        <span class="category-group-item__total">
          {{ localize(totalOf(group, 'budgeted'), budget) }}
        </span>
        <span class="category-group-item__total">
          {{ localize(totalOf(group, 'activity'), budget) }}
        </span>
        <span class="category-group-item__total">
          {{ localize(totalOf(group, 'available'), budget) }}
        </span>
      </header>

      <ul>
        <category-budget
          v-for="category in categoriesOf(group.id)"
          :key="category.id"
          :budget="budget"
          :category="category"
        />
      </ul>
    </div>
  </section>
</template>

<script>
import { CATEGORIES, CATEGORY_GROUPS, MONTHLY_BUDGETS } from '@/store/namespaces'
import { createNamespacedHelpers } from 'vuex'
import { useMoney } from '@/use/money'
import sumBy from 'lodash/sumBy'
import CategoryBudget from '@/components/categories/CategoryBudget'

const categoriesHelper = createNamespacedHelpers(CATEGORIES)
const categoryGroupsHelper = createNamespacedHelpers(CATEGORY_GROUPS)
const monthlyBudgetsHelper = createNamespacedHelpers(MONTHLY_BUDGETS)

export default {
  name: 'MonthlyBudgetsTable',

  props: {
    budget: {
      type: Object,
      required: true,
    },
  },

  components: {
    CategoryBudget,
  },

  setup () {
    const { localize } = useMoney()
    return { localize }
  },

  computed: {
    ...categoriesHelper.mapState(['categories']),
    ...categoryGroupsHelper.mapState(['categoryGroups']),
    ...monthlyBudgetsHelper.mapState(['monthlyBudgets']),
  },

  methods: {
    totalOf (categoryGroup, field) {
      const monthlyBudgets = this.monthlyBudgets.filter(c => {
        return c.categoryGroupId === categoryGroup.id
      })

      return sumBy(monthlyBudgets, field)
    },

    categoriesOf (categoryGroupId) {
      return this.categories.filter(c => c.categoryGroupId === categoryGroupId)
    },
  },
}
</script>

<style lang="scss" scoped>
.monthly-budgets__item {
  margin: $base*2 $base*3;
}

.category-group-item {
  background: var(--table-heading);
  border-bottom: 1px solid var(--acc-toolbar-border);
  border-top-left-radius: $base;
  border-top-right-radius: $base;
  color: var(--table-heading-text);
  cursor: pointer;
  display: flex;
  padding: $base*3 $base*4;
  width: 100%;

  @extend %body-1;
  @extend %medium;

  &__name {
    flex-basis: 40%;

    @extend %semi-bold ;
  }

  &__total {
    flex-basis: 20%;
    text-align: right;
  }
}
</style>
