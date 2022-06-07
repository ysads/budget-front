<template>
  <sad-drawer
    class="transaction-details"
    :title="t('newTransaction')"
    :show="show"
    data-test="drawer"
    @close="$emit('close')"
  >
    <sad-select
      v-model="form.accountId"
      class="transaction-details__control"
      :disabled="isAccountDisabled"
      :label="st('account')"
      :options="accountOptions"
      :placeholder="t('placeholders.select')"
      name="account"
      data-test="account"
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
      v-model="form.memo"
      class="transaction-details__control"
      :label="st('memo')"
      :tip="st('memoTip')"
      name="memo"
      data-test="memo"
    />
    <sad-switch
      v-model="form.outflow"
      class="transaction-details__outflow"
      :active-label="st('outflow')"
      :inactive-label="st('inflow')"
      :disabled="!form.categoryId"
    />
    <sad-input
      v-model="form.amount"
      class="transaction-details__control"
      :label="st('amount')"
      :prefix="currencySymbol"
      name="amount"
      data-test="amount"
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
import SadSelect from '@/components/sad/SadSelect.vue';
import SadSwitch from '@/components/sad/SadSwitch.vue';
import useBudgetCategories from '@/use/budget-categories';
import useTransactionForm from '@/use/forms/transaction';
import useI18n from '@/use/i18n';
import { currencySettings, currencyToCents } from '@/support/money';
import { handleApiError } from '@/api/errors';
import { openBudget } from '@/repositories/budgets';
import { accounts } from '@/repositories/accounts';
import { payees } from '@/repositories/payees';
import { PropType, SetupContext, computed, defineComponent } from 'vue';
import { Account, Transaction } from '@/types/models';
import { symbolOf } from '@/support/currencies';

export default defineComponent({
  name: 'TransactionDetails',

  props: {
    account: {
      type: Object as PropType<Account | undefined>,
      default: null,
    },
    show: {
      type: Boolean,
      default: false,
    },
    transaction: {
      type: Object as PropType<Transaction>,
      default: () => ({} as Transaction),
    },
  },

  emits: ['close'],

  components: {
    SadButton,
    SadDatePicker,
    SadDrawer,
    SadInput,
    SadSelect,
    SadSwitch,
  },

  setup(props, { emit }: SetupContext) {
    const { t, st } = useI18n('TransactionDetails');
    const { categoryOptions } = useBudgetCategories();

    const isEdit = computed(() => Boolean(props.transaction.id));

    // INFO: needed since we won't allow moving transactions between accounts here
    const isAccountDisabled = computed(
      () => isEdit.value || Boolean(props.account?.id),
    );

    const moneySettings = currencySettings(openBudget.value);
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

    const { form, saveMessage, resetForm, saveForm } = useTransactionForm({
      props,
      isEdit,
      moneySettings,
    });

    const handleSubmit = async () => {
      try {
        await saveForm({
          ...form,
          amount: currencyToCents(form.amount, openBudget.value),
        });
        alert.success(saveMessage.value);
        resetForm();
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
      handleSubmit,
      isAccountDisabled,
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
    margin-top: $base * 4;
    width: 100%;
  }
}
</style>
