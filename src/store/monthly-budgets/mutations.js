// import groupBy from 'lodash/groupBy'

export default {
  SET_MONTHLY_BUDGETS: (state, monthlyBudgets) => {
    state.monthlyBudgets = monthlyBudgets
    // state.monthlyBudgets = groupBy(monthlyBudgets, 'categoryGroupId')
  },
}
