<template>
  <sad-drawer
    class="transaction-details"
    :title="title"
    :show="show"
    data-test="drawer"
    @close="$emit('close')"
  >
    <sad-button
      v-if="isEdit"
      class="transaction-details__delete"
      size="small"
      type="danger"
      icon="trash-can"
      data-test="delete-btn"
      @click="handleDelete"
    >
      {{ t('general.delete') }}
    </sad-button>
    <sad-select
      v-model="form.accountId"
      class="transaction-details__control"
      :disabled="isAccountDisabled"
      :label="t('TransactionDetails.account')"
      :options="accountOptions"
      :placeholder="t('placeholders.select')"
      name="account"
      data-test="account"
    />
    <sad-select
      v-model="form.payeeName"
      class="transaction-details__control"
      :label="t('TransactionDetails.payee')"
      :options="payeeOptions"
      :placeholder="t('placeholders.select')"
      name="payee"
      allow-create
      data-test="payee"
    />
    <sad-date-picker
      v-model="form.referenceAt"
      class="transaction-details__control"
      :label="t('TransactionDetails.referenceAt')"
      :placeholder="t('TransactionDetails.referenceAt')"
      :format="openBudget.dateFormat"
      name="reference-at"
      data-test="reference-at"
    />
    <sad-select
      v-model="form.categoryId"
      class="transaction-details__control"
      name="category"
      :label="t('TransactionDetails.category')"
      :options="categoryOptions"
      :placeholder="t('placeholders.select')"
      grouped
      data-test="category"
    />
    <sad-input
      v-model="form.memo"
      class="transaction-details__control"
      :label="t('TransactionDetails.memo')"
      :tip="t('TransactionDetails.memoTip')"
      name="memo"
      data-test="memo"
    />
    <sad-switch
      v-model="form.outflow"
      class="transaction-details__outflow"
      :active-label="t('TransactionDetails.outflow')"
      :inactive-label="t('TransactionDetails.inflow')"
      :disabled="!form.categoryId"
    />
    <sad-input
      v-model="form.amount"
      class="transaction-details__control"
      :label="t('TransactionDetails.amount')"
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
        {{ t('general.save') }}
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
import { useI18n } from 'vue-i18n';
import { currencySettings, currencyToCents } from '@/support/money';
import { handleApiError } from '@/api/errors';
import { openBudget } from '@/repositories/budgets';
import { accounts } from '@/repositories/accounts';
import { payees } from '@/repositories/payees';
import { deleteTransaction } from '@/repositories/transactions';
import { PropType, computed, defineComponent } from 'vue';
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

  setup(props, { emit }) {
    const { t } = useI18n();
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

    const title = computed(() =>
      isEdit.value ? t('TransactionDetails.edit') : t('TransactionDetails.add'),
    );

    const handleDelete = async () => {
      if (!form.id) return;

      try {
        await deleteTransaction({
          budgetId: openBudget.value.id,
          id: form.id,
        });
        emit('close');
        alert.success(t('general.deleted'));
      } catch {
        alert.error(t('TransactionDetails.failedToDelete'));
      }
    };

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
      handleDelete,
      isAccountDisabled,
      isEdit,
      openBudget,
      payeeOptions,
      t,
      title,
    };
  },
});
</script>

<style lang="scss" scoped>
.transaction-details {
  &__delete {
    margin-bottom: 20px;
    margin-left: -12px;
  }

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
