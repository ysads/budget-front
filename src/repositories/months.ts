import { get } from '@/api';
import { isoMonth } from '@/support/date';
import { IsoMonth, Month } from '@/types/models';
import { ref } from 'vue';

interface ApiMonthRequest {
  budgetId: string;
  isoMonth: IsoMonth;
}

export const currentMonth = ref<Month>({
  id: '',
  activity: 0,
  budgeted: 0,
  income: 0,
  isoMonth: isoMonth(new Date()),
  toBeBudgeted: 0,
});

export const getMonthByIso = async (params: ApiMonthRequest): Promise<void> => {
  const month = await get(
    `budgets/${params.budgetId}/months/${params.isoMonth}`,
  );

  currentMonth.value = month;
};
