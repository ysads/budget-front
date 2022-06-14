import * as api from '@/api';
import * as repository from '@/repositories/monthly-budgets';
import factories from '#/factories';
import faker from 'faker';

describe.skip('MonthlyBudgetsRepository', () => {
  beforeEach(() => {
    repository.monthlyBudgets.value = [];
  });

  describe('#getMonthlyBudgets', () => {
    it('dispatches a GET to api', async () => {
      const budgetId = faker.datatype.uuid();
      await repository.getMonthlyBudgets({ budgetId, other: 'param' });

      expect(api.get).toHaveBeenCalledWith(
        `budgets/${budgetId}/monthly_budgets`,
        { other: 'param' },
      );
    });

    it('commits to monthlyBudgets object', async () => {
      const budgetId = faker.datatype.uuid();
      const monthlyBudgets = factories.monthlyBudget.buildList(2);

      api.get.mockResolvedValueOnce(monthlyBudgets);

      await repository.getMonthlyBudgets({ budgetId });

      expect(repository.monthlyBudgets.value).toEqual(monthlyBudgets);
    });
  });

  describe('#createMonthlyBudget', () => {
    it('dispatches a POST to api', async () => {
      const budgetId = faker.datatype.uuid();
      const params = { mock: true, budgetId };

      await repository.createMonthlyBudget(params);

      expect(api.post).toHaveBeenCalledWith(
        `budgets/${budgetId}/monthly_budgets`,
        { mock: true },
      );
    });

    it('updates monthly budgets with newly-created resource', async () => {
      const params = { param: 1 };
      const monthlyBudget = factories.monthlyBudget.build();

      api.post.mockResolvedValueOnce(monthlyBudget);

      await repository.createMonthlyBudget(params);

      expect(repository.monthlyBudgets.value).toEqual([monthlyBudget]);
    });
  });

  describe('#updateMonthlyBudget', () => {
    it('dispatches a PUT to api', async () => {
      const budgetId = faker.datatype.uuid();
      const id = faker.datatype.uuid();
      const params = { mock: true, budgetId, id };

      await repository.updateMonthlyBudget(params);

      expect(api.put).toHaveBeenCalledWith(
        `budgets/${budgetId}/monthly_budgets/${id}`,
        { mock: true },
      );
    });

    it('updates monthly budgets with newly-created resource', async () => {
      const params = { param: 1 };
      const monthlyBudgetOne = factories.monthlyBudget.build();
      const monthlyBudgetTwo = factories.monthlyBudget.build();
      const updatedMonthlyBudgetTwo = { ...monthlyBudgetTwo, updatedParam: 2 };

      repository.monthlyBudgets.value = [monthlyBudgetOne, monthlyBudgetTwo];

      api.put.mockResolvedValueOnce(updatedMonthlyBudgetTwo);

      await repository.updateMonthlyBudget(params);

      expect(repository.monthlyBudgets.value).toEqual([
        monthlyBudgetOne,
        updatedMonthlyBudgetTwo,
      ]);
    });
  });
});
