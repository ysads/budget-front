import * as api from '@/api';
import * as transactionRepository from '@/repositories/transactions';
import * as transfersRepository from '@/repositories/transfers';
import factories from '#/factories';
import { ApiTransferMutation } from '@/types/api';

const budget = factories.budget.build();
const params = { budgetId: budget.id } as ApiTransferMutation;

describe('TransfersRepository', () => {
  beforeEach(() => {
    jest.spyOn(transactionRepository, 'upsertTransaction');
    jest.spyOn(transactionRepository, 'removeTransaction');
  });

  describe('#createTransaction', () => {
    it('dispatches a POST to api', async () => {
      // @ts-expect-error
      api.post.mockResolvedValueOnce([factories.transfer.build()]);

      await transfersRepository.createTransfer(params);

      expect(api.post).toHaveBeenCalledWith(
        `budgets/${budget.id}/transfers`,
        params,
      );
    });

    it('upserts transactions received from API', async () => {
      const transactions = factories.transfer.buildList(2);
      // @ts-expect-error
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

  describe('#updateTransaction', () => {
    it('dispatches a PUT to api', async () => {
      // @ts-expect-error
      api.put.mockResolvedValueOnce([factories.transfer.build()]);

      await transfersRepository.updateTransfer(params);

      expect(api.put).toHaveBeenCalledWith(
        `budgets/${budget.id}/transfers`,
        params,
      );
    });

    it('removes previous transactions using ids received from API', async () => {
      const transactions = factories.transfer.buildList(2);
      // @ts-expect-error
      api.put.mockResolvedValueOnce(transactions);

      await transfersRepository.updateTransfer(params);

      expect(transactionRepository.removeTransaction).toHaveBeenCalledWith(
        transactions[0].id,
      );
      expect(transactionRepository.removeTransaction).toHaveBeenCalledWith(
        transactions[1].id,
      );
    });

    it('upserts transactions received from API', async () => {
      const transactions = factories.transfer.buildList(2);
      // @ts-expect-error
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
});
