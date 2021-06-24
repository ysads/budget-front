<template>
  <sad-drawer
    class="mb-details"
    :title="t('newMonthlyBudget')"
    data-test="drawer"
    @close="$emit('close')"
  >
    <sad-select
      v-model="form.categoryId"
      class="mb-details__control"
      :disabled="isEdit"
      :label="st('category')"
      :options="categoriesGrouped"
      :placeholder="st('categoryPlaceholder')"
      name="category"
      data-test="category"
      grouped
    />
    <sad-input
      v-model="form.budgeted"
      class="mb-details__control"
      :label="st('budgeted')"
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
        {{ t('save') }}
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
import useI18n from '@/use/i18n';
import { handleApiError } from '@/api/errors';
import { openBudget } from '@/repositories/budgets';
import { categoriesByGroupId } from '@/repositories/categories';
import { categoryGroups } from '@/repositories/category-groups';
import {
  createMonthlyBudget,
  updateMonthlyBudget,
} from '@/repositories/monthly-budgets';
import { currencySettings, currencyToCents, format } from '@/support/money';
import { currentMonth } from '@/repositories/months';
import {
  SetupContext,
  computed,
  reactive,
  defineComponent,
  PropType,
} from 'vue';
import { MonthlyBudget } from '@/types/models';

export default defineComponent({
  name: 'MonthlyBudgetDetails',

  props: {
    monthlyBudget: {
      type: Object as PropType<MonthlyBudget>,
      default: () => ({}),
    },
  },

  emits: ['close'],

  components: {
    SadButton,
    SadDrawer,
    SadInput,
    SadSelect,
  },

  setup(props, { emit }: SetupContext) {
    const { st, t } = useI18n('MonthlyBudgetDetails');

    const isEdit = computed(() => Boolean(props.monthlyBudget.id));

    const moneySettings = currencySettings(openBudget.value);

    const form = reactive({
      id: props.monthlyBudget.id || '',
      categoryId: props.monthlyBudget.categoryId || '',
      budgeted: isEdit.value
        ? format(props.monthlyBudget.budgeted, moneySettings, false)
        : '',
    });

    const categoriesGrouped = categoryGroups.value.map((group) => ({
      label: group.name,
      options: categoriesByGroupId(group.id).map((c) => ({
        value: c.id,
        label: c.name,
      })),
    }));

    const handleSubmit = async () => {
      const save = isEdit.value ? updateMonthlyBudget : createMonthlyBudget;

      try {
        await save({
          ...form,
          budgeted: currencyToCents(form.budgeted, openBudget.value),
          budgetId: openBudget.value.id,
          monthId: currentMonth.value.id,
        });
        alert.success(isEdit.value ? st('updated') : st('created'));
        emit('close');
      } catch (err) {
        handleApiError(err);
      }
    };

    return {
      categoriesGrouped,
      currentMonth,
      form,
      isEdit,
      handleSubmit,
      moneySettings,
      openBudget,
      st,
      t,
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
