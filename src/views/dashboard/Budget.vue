<template>
  <div class="budget">
    <loading v-if="isLoading " data-test="loading" />
    <section v-else>
      <month-header
        :budget="openBudget"
        :month="openMonth"
        @update="updateCurrentMonth"
      />
      <budget-toolbar
        :budget="openBudget"
      />
      <div v-for="category in categories" :key="category.id">
        {{ category.id }} – {{ category.name }}
      </div>
    </section>
  </div>
</template>

<script>
import BudgetToolbar from '@/components/budgets/BudgetToolbar'
import Loading from '@/components/Loading'
import MonthHeader from '@/components/months/MonthHeader'
import { BUDGETS, MONTHS, CATEGORIES } from '@/store/namespaces'
import { createNamespacedHelpers } from 'vuex'
import { isoMonth } from '@/support/date'

const budgetsHelper = createNamespacedHelpers(BUDGETS)
const monthsHelper = createNamespacedHelpers(MONTHS)
const categoriesHelper = createNamespacedHelpers(CATEGORIES)

export default {
  name: 'Budget',

  components: {
    BudgetToolbar,
    Loading,
    MonthHeader,
  },

  data () {
    return {
      isLoading: true,
      currentMonth: new Date(),
    }
  },

  async mounted () {
    this.isLoading = true
    await this.fetchResources()
    this.isLoading = false
  },

  computed: {
    ...budgetsHelper.mapState(['openBudget']),
    ...monthsHelper.mapState(['months']),
    ...categoriesHelper.mapState(['categories']),

    currentIsoMonth () {
      return isoMonth(this.currentMonth)
    },

    openMonth () {
      return this.months[this.currentIsoMonth]
    },
  },

  methods: {
    ...monthsHelper.mapActions(['getMonth']),

    async fetchResources () {
      console.log(this.currentIsoMonth)
      await this.getMonth({
        budgetId: this.openBudget.id,
        isoMonth: this.currentIsoMonth,
      })
    },

    updateCurrentMonth (updatedMonth) {
      this.currentMonth = updatedMonth
      this.fetchResources()
    },
  },
}
</script>
