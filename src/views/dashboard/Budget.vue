<template>
  <div class="budget">
    <loading v-if="isLoading" data-test="loading" />
    <section v-else>
      <month-header
        :budget="openBudget"
        :month="currentMonth"
        data-test="month-header"
        @update="updateCurrentMonth"
      />
      <budget-toolbar :budget="openBudget" data-test="toolbar" />
      <monthly-budgets-table data-test="table" />
    </section>
  </div>
</template>

<script lang="ts">
import BudgetToolbar from '@/components/budgets/BudgetToolbar.vue';
import Loading from '@/components/Loading.vue';
import MonthHeader from '@/components/months/MonthHeader.vue';
import MonthlyBudgetsTable from '@/components/monthly-budgets/MonthlyBudgetsTable.vue';
import { isoMonth, isoMonthToDate } from '@/support/date';
import { openBudget } from '@/repositories/budgets';
import { getMonthlyBudgets } from '@/repositories/monthly-budgets';
import { currentMonth, getMonthByIso } from '@/repositories/months';
import { useRoute, useRouter } from 'vue-router';
import { computed, defineComponent, ref, watchEffect } from 'vue';
import { IsoMonth } from '@/types/models';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'Budget',

  components: {
    BudgetToolbar,
    Loading,
    MonthHeader,
    MonthlyBudgetsTable,
  },

  setup() {
    const route = useRoute();
    const router = useRouter();
    const { t, d } = useI18n();

    const isLoading = ref(true);
    const currentIsoMonth = computed(() => {
      return (route.params.isoMonth as IsoMonth) || isoMonth(new Date());
    });

    const updateCurrentMonth = (updatedMonth: Date) => {
      router.push({
        name: 'MonthBudget',
        params: { isoMonth: isoMonth(updatedMonth) },
      });
    };

    watchEffect(async () => {
      const params = {
        budgetId: openBudget.value.id,
        isoMonth: currentIsoMonth.value,
      };

      await Promise.all([getMonthByIso(params), getMonthlyBudgets(params)]);
      document.title = t('htmlTitle.Budget', {
        month: d(isoMonthToDate(currentIsoMonth.value), 'monthOnly'),
      });

      isLoading.value = false;
    });

    return { isLoading, currentMonth, openBudget, updateCurrentMonth };
  },
});
</script>
