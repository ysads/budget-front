<template>
  <div class="budget">
    <loading v-if="isLoading " data-test="loading" />
    <section v-else>
      <month-header
        :budget="openBudget"
        :month="currentMonth"
        data-test="month-header"
        @update="updateCurrentMonth"
      />
      <budget-toolbar
        :budget="openBudget"
        data-test="toolbar"
      />
      <monthly-budgets-table
        data-test="table"
      />
    </section>
  </div>
</template>

<script>
import BudgetToolbar from '@/components/budgets/BudgetToolbar'
import Loading from '@/components/Loading'
import MonthHeader from '@/components/months/MonthHeader'
import MonthlyBudgetsTable from '@/components/monthly-budgets/MonthlyBudgetsTable'
import { isoMonth } from '@/support/date'
import { openBudget } from '@/repositories/budgets'
import { getMonthlyBudgets } from '@/repositories/monthly-budgets'
import { currentMonth, getMonthByIso } from '@/repositories/months'

export default {
  name: 'Budget',

  components: {
    BudgetToolbar,
    Loading,
    MonthHeader,
    MonthlyBudgetsTable,
  },

  data () {
    return {
      isLoading: true,
    }
  },

  setup () {
    return { currentMonth, openBudget }
  },

  async mounted () {
    this.isLoading = true
    await this.fetchResources()
    this.isLoading = false
  },

  computed: {
    currentIsoMonth () {
      return this.$route.params.isoMonth || isoMonth(new Date())
    },
  },

  methods: {
    async fetchResources () {
      const params = {
        budgetId: this.openBudget.id,
        isoMonth: this.currentIsoMonth,
      }

      await Promise.all([
        getMonthByIso(params),
        getMonthlyBudgets(params),
      ])
    },

    updateCurrentMonth (updatedMonth) {
      this.$router.push({
        name: 'MonthBudget',
        params: { isoMonth: isoMonth(updatedMonth) },
      })
    },
  },

  watch: {
    '$route.params.isoMonth' () {
      this.fetchResources()
    },
  },
}
</script>
