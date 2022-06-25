import * as api from '@/api';
import * as accountRepository from '@/repositories/accounts';
import * as transactionRepository from '@/repositories/transactions';
import * as transfersRepository from '@/repositories/transfers';
import factories from '#/factories';
import { ApiTransferMutation } from '@/types/api';

const budget = factories.budget.build();
const params = { budgetId: budget.id } as ApiTransferMutation;
const deleteParams = {
  budgetId: budget.id,
  destinationTransactionId: 'destination-uuid',
  originTransactionId: 'origin-uuid',
};

describe('TransfersRepository', () => {
  beforeEach(() => {
    jest.spyOn(accountRepository, 'getAccounts');
    jest.spyOn(transactionRepository, 'upsertTransaction');
    jest.spyOn(transactionRepository, 'removeTransactionLocally');
  });

  describe('#createTransfer', () => {
    it('dispatches a POST to api', async () => {
      // @ts-expect-error: api is mocked but types are not recognized
      api.post.mockResolvedValueOnce([factories.transfer.build()]);

      await transfersRepository.createTransfer(params);

      expect(api.post).toHaveBeenCalledWith(
        `budgets/${budget.id}/transfers`,
        params,
      );
    });

    it('upserts transactions received from API', async () => {
      const transactions = factories.transfer.buildList(2);
      // @ts-expect-error: api is mocked but types are not recognized
      api.post.mockResolvedValueOnce(transactions);

      await transfersRepository.createTransfer(params);

      expect(transactionRepository.upsertTransaction).toHaveBeenCalledWith(
        transactions[0],
      );
      expect(transactionRepository.upsertTransaction).toHaveBeenCalledWith(
        transactions[1],
      );
    });
  });

  describe('#updateTransfer', () => {
    it('dispatches a PUT to api', async () => {
      // @ts-expect-error: api is mocked but types are not recognized
      api.put.mockResolvedValueOnce([factories.transfer.build()]);

      await transfersRepository.updateTransfer(params);

      expect(api.put).toHaveBeenCalledWith(
        `budgets/${budget.id}/transfers`,
        params,
      );
    });

    it('removes prev transactions using ids received from API', async () => {
      const transactions = factories.transfer.buildList(2);
      // @ts-expect-error: api is mocked but types are not recognized
      api.put.mockResolvedValueOnce(transactions);

      await transfersRepository.updateTransfer(params);

      expect(
        transactionRepository.removeTransactionLocally,
      ).toHaveBeenCalledWith(transactions[0].id);
      expect(
        transactionRepository.removeTransactionLocally,
      ).toHaveBeenCalledWith(transactions[1].id);
    });

    it('upserts transactions received from API', async () => {
      const transactions = factories.transfer.buildList(2);
      // @ts-expect-error: api is mocked but types are not recognized
      api.put.mockResolvedValueOnce(transactions);

      await transfersRepository.updateTransfer(params);

      expect(transactionRepository.upsertTransaction).toHaveBeenCalledWith(
        transactions[0],
      );
      expect(transactionRepository.upsertTransaction).toHaveBeenCalledWith(
        transactions[1],
      );
    });
  });

  describe('#deleteTransfer', () => {
    it('dispatches a DELETE to api', async () => {
      await transfersRepository.deleteTransfer(deleteParams);

      expect(api.del).toHaveBeenCalledWith(
        `budgets/${budget.id}/transfers`,
        deleteParams,
      );
    });

    it('refreshes accounts', async () => {
      await transfersRepository.deleteTransfer(deleteParams);

      expect(accountRepository.getAccounts).toHaveBeenCalledWith({
        budgetId: deleteParams.budgetId,
      });
    });

    it('removes both transactions from local transactions array', async () => {
      const transaction1 = factories.transaction.build();
      const transaction2 = factories.transaction.build();
      const transaction3 = factories.transaction.build();

      transactionRepository.transactions.value = [
        transaction1,
        transaction2,
        transaction3,
      ];

      await transfersRepository.deleteTransfer({
        budgetId: budget.id,
        originTransactionId: transaction1.id,
        destinationTransactionId: transaction2.id,
      });

      expect(transactionRepository.transactions.value).toEqual([transaction3]);
    });
  });
});
