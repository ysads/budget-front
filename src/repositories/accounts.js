import { get, post } from '@/api'
import { computed, ref } from '@vue/composition-api'
import { upsert } from '@/support/collection'

export const accounts = ref([])

export const budgetAccounts = computed(() => {
  return accounts.value.filter(a => a.nature === 'budget')
})

export const trackingAccounts = computed(() => {
  return accounts.value.filter(a => a.nature === 'tracking')
})

export const createAccount = async ({ budgetId, ...rest }) => {
  const account = await post(`budgets/${budgetId}/accounts`, rest)

  accounts.value = [...accounts.value, account]
}

export const getAccounts = async ({ budgetId }) => {
  accounts.value = await get(`budgets/${budgetId}/accounts`)
}

export const getAccountById = (id) => {
  return accounts.value.find(a => a.id === id)
}

export const upsertAccount = async (account) => {
  accounts.value = upsert(accounts.value, account)
}
