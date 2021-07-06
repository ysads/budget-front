<template>
  <sad-drawer
    class="transaction-details"
    :title="t('newTransaction')"
    :show="show"
    data-test="drawer"
    @close="$emit('close')"
  >
    <sad-switch
      v-model="form.outflow"
      class="transaction-details__control transaction-details__outflow"
      :active-label="st('outflow')"
      :inactive-label="st('inflow')"
    />
    <sad-select
      v-if="!originAccount"
      v-model="form.originId"
      class="transaction-details__control"
      :label="st('account')"
      :options="accountOptions"
      :placeholder="t('placeholders.select')"
      name="origin"
      data-test="origin-account"
    />
    <sad-select
      v-model="form.payeeName"
      class="transaction-details__control"
      :label="st('payee')"
      :options="payeeOptions"
      :placeholder="t('placeholders.select')"
      name="payee"
      allow-create
      data-test="payee"
    />
    <sad-date-picker
      v-model="form.referenceAt"
      class="transaction-details__control"
      :label="st('referenceAt')"
      :placeholder="st('referenceAt')"
      :format="openBudget.dateFormat"
      name="reference-at"
      data-test="reference-at"
    />
    <sad-select
      v-model="form.categoryId"
      class="transaction-details__control"
      name="category"
      :label="st('category')"
      :options="categoryOptions"
      :placeholder="t('placeholders.select')"
      grouped
      data-test="category"
    />
    <sad-input
      v-model="form.amount"
      class="transaction-details__control"
      :label="st('amount')"
      :prefix="currencySymbol"
      name="amount"
      data-test="amount"
    />
    <sad-input
      v-model="form.memo"
      class="transaction-details__control"
      :label="st('memo')"
      :tip="st('memoTip')"
      name="memo"
      data-test="memo"
    />
    <sad-checkbox
      class="transaction-details__control"
      :label="st('clearedAt')"
      :tip="st('clearedAtTip')"
      :model-value="Boolean(form.clearedAt)"
      name="cleared-at"
      data-test="cleared-at"
      @update:model-value="handleClearedAt"
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
import alert from '@/support/alert';
import SadButton from '@/components/sad/SadButton.vue';
import SadDatePicker from '@/components/sad/SadDatePicker.vue';
import SadDrawer from '@/components/sad/SadDrawer.vue';
import SadInput from '@/components/sad/SadInput.vue';
import SadCheckbox from '@/components/sad/SadCheckbox.vue';
import SadSelect from '@/components/sad/SadSelect.vue';
import SadSwitch from '@/components/sad/SadSwitch.vue';
import useBudgetCategories from '@/use/budget-categories';
import useI18n from '@/use/i18n';
import { currencySettings, currencyToCents } from '@/support/money';
import { createTransaction } from '@/repositories/transactions';
import { handleApiError } from '@/api/errors';
import { openBudget } from '@/repositories/budgets';
import { accounts } from '@/repositories/accounts';
import { payees } from '@/repositories/payees';
import {
  PropType,
  SetupContext,
  computed,
  defineComponent,
  reactive,
} from 'vue';
import { Account, NullishDate } from '@/types/models';
import { symbolOf } from '@/support/currencies';

export default defineComponent({
  name: 'TransactionDetails',

  props: {
    originAccount: {
      type: Object as PropType<Account | null>,
      default: null,
    },
    show: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['close'],

  components: {
    SadButton,
    SadDatePicker,
    SadDrawer,
    SadInput,
    SadCheckbox,
    SadSelect,
    SadSwitch,
  },

  setup(props, { emit }: SetupContext) {
    const { t, st } = useI18n('TransactionDetails');
    const { categoryOptions } = useBudgetCategories();

    const money = currencySettings(openBudget.value);
    const currencySymbol = computed(() => symbolOf(openBudget.value.currency));

    const payeeOptions = computed(() =>
      payees.value.map((p) => ({
        label: p.name,
        value: p.name,
      })),
    );

    const accountOptions = computed(() =>
      accounts.value.map((a) => ({
        label: a.name,
        value: a.id,
      })),
    );

    const form = reactive({
      amount: '',
      budgetId: openBudget.value.id,
      clearedAt: new Date().toISOString() as NullishDate,
      memo: '',
      categoryId: '',
      originId: props.originAccount?.id || '',
      outflow: true,
      payeeName: '',
      referenceAt: new Date(),
    });

    const handleClearedAt = (checked: boolean) => {
      form.clearedAt = checked ? new Date().toISOString() : null;
    };

    const handleSubmit = async () => {
      try {
        await createTransaction({
          ...form,
          amount: currencyToCents(form.amount, openBudget.value),
        });
        alert.success(st('created'));
        emit('close');
      } catch (err) {
        handleApiError(err);
      }
    };

    return {
      accountOptions,
      categoryOptions,
      currencySymbol,
      form,
      handleClearedAt,
      handleSubmit,
      money,
      openBudget,
      payeeOptions,
      st,
      t,
    };
  },
});
</script>

<style lang="scss" scoped>
.transaction-details {
  &__control + &__control {
    margin-top: $base * 4;
  }

  &__outflow {
    display: inline-flex;
    justify-content: center;
    width: 100%;
  }
}
</style>
