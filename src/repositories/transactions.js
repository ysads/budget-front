import { post } from '@/api'
import { ref } from '@vue/composition-api'
import { upsertAccount } from '@/repositories/accounts'
import { upsertPayee } from '@/repositories/payees'

export const transactions = ref([])

export const createTransaction = async (params) => {
  const response = await post(
    `budgets/${params.budgetId}/transactions`, params,
  )

  transactions.value = [...transactions.value, response]

  upsertPayee(response.payee)
  upsertAccount(response.origin)
}
