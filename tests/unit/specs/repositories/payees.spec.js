import * as api from '@/api';
import * as repository from '@/repositories/payees';
import factories from '#/factories';
import faker from 'faker';

describe('PayeesRepository', () => {
  beforeEach(() => {
    repository.payees.value = [];
  });

  describe('#getPayees', () => {
    it('dispatches a GET to api', async () => {
      const budgetId = faker.datatype.uuid();
      const params = { mock: true, budgetId };

      await repository.getPayees(params);

      expect(api.get).toHaveBeenCalledWith(`budgets/${budgetId}/payees`);
    });

    it('saves fetched resources to local payees', async () => {
      const params = { mock: true };
      const payees = factories.payee.buildList(2);

      api.get.mockResolvedValueOnce(payees);

      await repository.getPayees(params);

      expect(repository.payees.value).toEqual(payees);
    });
  });

  describe('#upsertPayee', () => {
    it('adds a new payee', () => {
      const newPayee = factories.payee.build();

      repository.upsertPayee(newPayee);

      expect(repository.payees.value).toContainEqual(newPayee);
    });

    it('updates an existing payee', () => {
      const payee = factories.payee.build();
      repository.payees.value = [factories.payee.build()];

      const newPayee = { ...payee, name: 'NEW PAYEE' };

      repository.upsertPayee(newPayee);

      expect(repository.payees.value).toContainEqual(newPayee);
    });
  });
});
