import * as api from '@/api';
import * as accountRepository from '@/repositories/accounts';
import * as payeeRepository from '@/repositories/payees';
import * as transactionRepository from '@/repositories/transactions';
import factories from '#/factories';
import { ApiTransactionMutation } from '@/types/api';

const budget = factories.budget.build();
const createParams = { budgetId: budget.id } as ApiTransactionMutation;
const deleteParams = { budgetId: budget.id, id: 'transaction-uuid' };

describe('TransactionsRepository', () => {
  beforeEach(() => {
    jest.spyOn(accountRepository, 'upsertAccount');
    jest.spyOn(payeeRepository, 'upsertPayee');
    transactionRepository.transactions.value = [];
  });

  describe('#createTransaction', () => {
    beforeEach(() => {
      jest.spyOn(transactionRepository, 'upsertTransaction');
    });

    it('dispatches a POST to api', async () => {
      // @ts-expect-error: api is mocked but types are not recognized
      api.post.mockResolvedValueOnce(factories.transaction.build());

      await transactionRepository.createTransaction(createParams);

      expect(api.post).toHaveBeenCalledWith(
        `budgets/${budget.id}/transactions`,
        createParams,
      );
    });

    it('calls upsertTransaction with API response', async () => {
      const transactionWithRelationships = factories.transaction.build();

      // @ts-expect-error: api is mocked but types are not recognized
      api.post.mockResolvedValueOnce(transactionWithRelationships);
      await transactionRepository.createTransaction(createParams);

      expect(transactionRepository.upsertTransaction).toHaveBeenCalledWith(
        transactionWithRelationships,
      );
    });
  });

  describe('#upsertTransaction', () => {
    it('adds transaction into local transactions array', () => {
      const transactionWithRelationships = factories.transaction.build();

      transactionRepository.upsertTransaction(transactionWithRelationships);

      const {
        payee: _payee,
        account: _account,
        ...transaction
      } = transactionWithRelationships;

      expect(transactionRepository.transactions.value).toContainEqual(
        transaction,
      );
    });

    it('calls upsertPayee and upsertAccount with destructured elements', () => {
      const transactionWithRelationships = factories.transaction.build();

      transactionRepository.upsertTransaction(transactionWithRelationships);

      const { payee, account } = transactionWithRelationships;

      expect(accountRepository.upsertAccount).toHaveBeenCalledWith(account);
      expect(payeeRepository.upsertPayee).toHaveBeenCalledWith(payee);
    });
  });

  describe('#deleteTransaction', () => {
    beforeEach(() => {
      jest.spyOn(accountRepository, 'getAccounts');
    });

    it('dispatches a DELETE to api', async () => {
      await transactionRepository.deleteTransaction(deleteParams);

      expect(api.del).toHaveBeenCalledWith(
        `budgets/${budget.id}/transactions/transaction-uuid`,
      );
    });

    it('refreshes accounts', async () => {
      await transactionRepository.deleteTransaction(deleteParams);

      expect(accountRepository.getAccounts).toHaveBeenCalledWith({
        budgetId: deleteParams.budgetId,
      });
    });

    it('removes transaction from local transactions array', async () => {
      const transactionOne = factories.transaction.build();
      const transactionTwo = factories.transaction.build();

      transactionRepository.transactions.value = [
        transactionOne,
        transactionTwo,
      ];

      await transactionRepository.deleteTransaction({
        budgetId: budget.id,
        id: transactionTwo.id,
      });

      expect(transactionRepository.transactions.value).toEqual([
        transactionOne,
      ]);
    });
  });

  describe('#removeTransactionLocally', () => {
    it('filters the record matching given id out of transactions array', () => {
      const transactions = factories.transaction.buildList(2);
      transactionRepository.transactions.value = transactions;

      transactionRepository.removeTransactionLocally(transactions[1].id);

      expect(transactionRepository.transactions.value).toContainEqual(
        transactions[0],
      );
    });
  });
});
