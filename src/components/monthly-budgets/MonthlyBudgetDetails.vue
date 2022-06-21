<template>
  <sad-drawer
    class="mb-details"
    :title="title"
    :show="show"
    data-test="drawer"
    @close="$emit('close')"
  >
    <sad-select
      v-model="form.categoryId"
      class="mb-details__control"
      :disabled="isEdit"
      :label="t('MonthlyBudgetDetails.category')"
      :options="categoriesGrouped"
      :placeholder="t('placeholders.select')"
      name="category"
      data-test="category"
      grouped
    />
    <sad-input
      v-model="form.budgeted"
      class="mb-details__control"
      :label="t('MonthlyBudgetDetails.budgeted')"
      :prefix="currencySymbol"
      name="budgeted"
      data-test="budgeted"
    />
    <template #footer>
      <sad-button
        size="normal"
        type="primary"
        full-width
        data-test="save-btn"
        @click="handleSubmit"
      >
        {{ t('general.save') }}
      </sad-button>
    </template>
  </sad-drawer>
</template>

<script lang="ts">
import SadButton from '@/components/sad/SadButton.vue';
import SadDrawer from '@/components/sad/SadDrawer.vue';
import SadInput from '@/components/sad/SadInput.vue';
import SadSelect from '@/components/sad/SadSelect.vue';
import alert from '@/support/alert';
import { useI18n } from 'vue-i18n';
import useMonthlyBudgetForm from '@/use/forms/monthly-budget';
import { handleApiError } from '@/api/errors';
import { openBudget } from '@/repositories/budgets';
import { findCategoriesByGroupName, groups } from '@/repositories/categories';
import {
  createMonthlyBudget,
  updateMonthlyBudget,
} from '@/repositories/monthly-budgets';
import { currencySettings, currencyToCents } from '@/support/money';
import { currentMonth } from '@/repositories/months';
import { computed, defineComponent, PropType } from 'vue';
import { MonthlyBudget } from '@/types/models';
import { symbolOf } from '@/support/currencies';

export default defineComponent({
  name: 'MonthlyBudgetDetails',

  props: {
    monthlyBudget: {
      type: Object as PropType<MonthlyBudget>,
      default: () => ({}),
    },
    show: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['close'],

  components: {
    SadButton,
    SadDrawer,
    SadInput,
    SadSelect,
  },

  setup(props, { emit }) {
    const { t } = useI18n();

    const isEdit = computed(() => Boolean(props.monthlyBudget.id));
    const currencySymbol = computed(() => symbolOf(openBudget.value.currency));

    const moneySettings = currencySettings(openBudget.value);

    const { form, resetForm } = useMonthlyBudgetForm(
      props,
      isEdit,
      moneySettings,
    );

    const categoriesGrouped = computed(() =>
      groups.value.map((group) => ({
        label: group,
        options: findCategoriesByGroupName(group).map((c) => ({
          value: c.id,
          label: c.name,
        })),
      })),
    );

    const title = computed(() =>
      isEdit.value
        ? t('MonthlyBudgetDetails.edit')
        : t('MonthlyBudgetDetails.add'),
    );

    const handleSubmit = async () => {
      const save = isEdit.value ? updateMonthlyBudget : createMonthlyBudget;

      try {
        await save({
          ...form,
          budgeted: currencyToCents(form.budgeted, openBudget.value),
          budgetId: openBudget.value.id,
          monthId: currentMonth.value.id,
        });
        alert.success(
          isEdit.value ? t('general.updated') : t('general.created'),
        );
        resetForm();
        emit('close');
      } catch (err) {
        handleApiError(err);
      }
    };

    return {
      categoriesGrouped,
      currentMonth,
      currencySymbol,
      form,
      isEdit,
      handleSubmit,
      moneySettings,
      openBudget,
      t,
      title,
    };
  },
});
</script>

<style lang="scss" scoped>
.mb-details {
  &__control {
    width: 100%;
  }

  &__control + &__control {
    margin-top: $base * 4;
  }
}
</style>
