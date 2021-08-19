import * as api from '@/api';
import * as repository from '@/repositories/months';
import factories from '#/factories';
import faker from 'faker';

describe('MonthsRepository', () => {
  beforeEach(() => {
    repository.currentMonth.value = {};
  });

  describe('#getMonthByIso', () => {
    it('dispatches a GET to api', async () => {
      const id = faker.datatype.uuid;
      const isoMonth = '2020-03';
      const params = { budgetId: id, isoMonth };

      await repository.getMonthByIso(params);

      expect(api.get).toHaveBeenCalledWith(`budgets/${id}/months/${isoMonth}`);
    });

    it('updates monthly budgets with newly-created resource', async () => {
      const id = faker.datatype.uuid;
      const isoMonth = '2020-03';
      const params = { budgetId: id, isoMonth };
      const month = factories.month.build();

      api.get.mockResolvedValueOnce(month);

      await repository.getMonthByIso(params);

      expect(repository.currentMonth.value).toEqual(month);
    });
  });

  describe('#refreshMonth', () => {
    it('fetches current month again from api', () => {
      const currentMonth = factories.month.build();
      repository.currentMonth.value = currentMonth;

      repository.refreshMonth();

      expect(api.get).toHaveBeenCalledWith(
        `budgets/${currentMonth.budgetId}/months/${currentMonth.isoMonth}`,
      );
    });
  });
});
