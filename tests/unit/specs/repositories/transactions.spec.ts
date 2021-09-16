import * as api from '@/api';
import * as accountRepository from '@/repositories/accounts';
import * as payeeRepository from '@/repositories/payees';
import * as transactionRepository from '@/repositories/transactions';
import factories from '#/factories';
import { ApiTransactionMutation } from '@/types/api';

const budget = factories.budget.build();
const createParams = { budgetId: budget.id } as ApiTransactionMutation;

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
      // @ts-expect-error
      api.post.mockResolvedValueOnce(factories.transaction.build());

      await transactionRepository.createTransaction(createParams);

      expect(api.post).toHaveBeenCalledWith(
        `budgets/${budget.id}/transactions`,
        createParams,
      );
    });

    it('calls upsertTransaction with API response', async () => {
      const transactionWithRelationships = factories.transaction.build();

      // @ts-expect-error
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

  describe('#removeTransaction', () => {
    it('filters the record matching given id out of transactions array', () => {
      const transactions = factories.transaction.buildList(2);
      transactionRepository.transactions.value = transactions;

      transactionRepository.removeTransaction(transactions[1].id);

      expect(transactionRepository.transactions.value).toContainEqual(
        transactions[0],
      );
    });
  });
});
