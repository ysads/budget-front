import { get } from '@/api'
import { ref } from '@vue/composition-api'
import { upsert } from '@/support/collection'

export const payees = ref([])

export const getPayees = async (params) => {
  const response = await get(
    `budgets/${params.budgetId}/payees`,
  )

  payees.value = response
}

export const upsertPayee = (newPayee) => {
  payees.value = upsert(payees.value, newPayee)
}
