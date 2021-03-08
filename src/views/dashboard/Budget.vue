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
      <monthly-budgets-table
        :budget="openBudget"
      />
    </section>
  </div>
</template>

<script>
import BudgetToolbar from '@/components/budgets/BudgetToolbar'
import Loading from '@/components/Loading'
import MonthHeader from '@/components/months/MonthHeader'
import MonthlyBudgetsTable from '@/components/monthly-budgets/MonthlyBudgetsTable'
import { MONTHS } from '@/store/namespaces'
import { createNamespacedHelpers } from 'vuex'
import { isoMonth } from '@/support/date'
import { openBudget } from '@/repositories/budgets'

const monthsHelper = createNamespacedHelpers(MONTHS)

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
      currentMonth: new Date(),
    }
  },

  setup () {
    return { openBudget }
  },

  async mounted () {
    this.isLoading = true
    await this.fetchResources()
    this.isLoading = false
  },

  computed: {
    ...monthsHelper.mapState(['months']),

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
