export default {
  SET_ACCOUNTS (state, accounts) {
    state.accounts = accounts
  },

  UPSERT_ACCOUNT (state, account) {
    state.accounts = [...state.accounts, account]
  },
}
