export default {
  budgetAccounts (state) {
    return state.accounts.filter(a => a.nature === 'budget')
  },

  trackingAccounts (state) {
    return state.accounts.filter(a => a.nature === 'tracking')
  },
}
