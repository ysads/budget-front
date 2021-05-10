import * as api from '@/api'
import * as accountRepository from '@/repositories/accounts'
import * as payeeRepository from '@/repositories/payees'
import * as transactionRepository from '@/repositories/transactions'
import factories from '#/factories'

const budget = factories.budget.build()

describe('TransactionsRepository', () => {
  beforeEach(() => {
    accountRepository.upsertAccount = jest.fn()
    payeeRepository.upsertPayee = jest.fn()
    transactionRepository.transactions.value = []
  })

  describe('#createTransaction', () => {
    it('dispatches a POST to api', async () => {
      const params = { budgetId: budget.id }

      api.post.mockResolvedValueOnce(factories.transaction.build())

      await transactionRepository.createTransaction(params)

      expect(api.post).toHaveBeenCalledWith(
        `budgets/${budget.id}/transactions`,
        params,
      )
    })

    it('conjoins new transaction to transactions object', async () => {
      const params = { budgetId: budget.id }

      const prevTransactions = factories.transaction.buildList(1)
      const newTransaction = factories.transaction.build()

      transactionRepository.transactions.value = prevTransactions
      api.post.mockResolvedValueOnce(newTransaction)

      await transactionRepository.createTransaction(params)

      expect(transactionRepository.transactions.value).toEqual([
        ...prevTransactions,
        newTransaction,
      ])
    })

    it("upserts transaction's origin to accountRepository", async () => {
      const params = { budgetId: budget.id }
      const transaction = factories.transaction.build()

      api.post.mockResolvedValueOnce(transaction)

      await transactionRepository.createTransaction(params)

      expect(accountRepository.upsertAccount).toHaveBeenCalledWith(
        transaction.origin,
      )
    })

    it("upserts transaction's payee to payeeRepository", async () => {
      const params = { budgetId: budget.id }
      const transaction = factories.transaction.build()

      api.post.mockResolvedValueOnce(transaction)

      await transactionRepository.createTransaction(params)

      expect(payeeRepository.upsertPayee).toHaveBeenCalledWith(
        transaction.payee,
      )
    })
  })
})
