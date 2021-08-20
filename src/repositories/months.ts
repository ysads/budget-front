import { get } from '@/api';
import { IsoMonth, Month } from '@/types/models';
import { ref } from 'vue';

interface ApiMonthRequest {
  budgetId: string;
  isoMonth: IsoMonth;
}

export const currentMonth = ref<Month>({} as Month);

export const getMonthByIso = async (params: ApiMonthRequest): Promise<void> => {
  const month = await get(
    `budgets/${params.budgetId}/months/${params.isoMonth}`,
  );

  currentMonth.value = month;
};

export const refreshMonth = (): void => {
  const { budgetId, isoMonth } = currentMonth.value;

  getMonthByIso({ budgetId, isoMonth });
};
