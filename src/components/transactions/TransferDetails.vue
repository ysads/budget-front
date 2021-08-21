<template>
  <sad-drawer
    :title="t('general.newTransfer')"
    :show="show"
    data-test="drawer"
    @close="$emit('close')"
  >
    <form class="transfer-details">
      <div class="transfer-details__accounts">
        <sad-select
          v-model="form.originId"
          class="transfer-details__accounts-input"
          :disabled="Boolean(originAccount?.id)"
          :label="st('origin')"
          :options="originOptions"
          :placeholder="t('placeholders.select')"
          name="transfer-origin"
          data-test="origin-account"
        />
        <sad-icon
          class="transfer-details__icon"
          name="arrow-circle-right"
          size="small"
          color="primary"
          aria-hidden
        />
        <sad-select
          v-model="form.destinationId"
          class="transfer-details__accounts-input"
          :label="st('destination')"
          :options="destinationOptions"
          :placeholder="t('placeholders.select')"
          name="transfer-destination"
          data-test="destination-account"
        />
      </div>
      <sad-select
        v-if="hasToSelectCategory"
        v-model="form.categoryId"
        class="transfer-details__control"
        name="transfer-category"
        :label="st('category')"
        :options="categoryOptions"
        :placeholder="t('placeholders.select')"
        :tip="st('categoryTip')"
        grouped
        data-test="category"
      />
      <sad-date-picker
        v-model="form.referenceAt"
        class="transfer-details__control"
        :label="st('referenceAt')"
        :placeholder="st('referenceAt')"
        :format="openBudget.dateFormat"
        name="transfer-reference-at"
        data-test="reference-at"
      />
      <sad-input
        v-model="form.amount"
        class="transfer-details__control"
        :label="st('amount')"
        :prefix="currencySymbol"
        name="transfer-amount"
        data-test="amount"
      />
      <sad-input
        v-model="form.memo"
        class="transfer-details__control"
        :label="st('memo')"
        :tip="st('memoTip')"
        name="transfer-memo"
        data-test="memo"
      />
    </form>

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
import SadIcon from '@/components/sad/SadIcon.vue';
import SadInput from '@/components/sad/SadInput.vue';
import SadSelect from '@/components/sad/SadSelect.vue';
import useBudgetCategories from '@/use/budget-categories';
import useTransferForm from '@/use/forms/transfer';
import useI18n from '@/use/i18n';
// import { currencySettings, currencyToCents } from '@/support/money';
// import { handleApiError } from '@/api/errors';
import { openBudget } from '@/repositories/budgets';
import { accounts, getAccountById } from '@/repositories/accounts';
import { PropType, computed, defineComponent, SetupContext } from 'vue';
import { Account, Transaction } from '@/types/models';
import { symbolOf } from '@/support/currencies';

export default defineComponent({
  name: 'TransferDetails',

  props: {
    originAccount: {
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
    SadIcon,
    SadInput,
    SadSelect,
  },

  setup(props, { emit }: SetupContext) {
    const { t, st } = useI18n('TransferDetails');
    const { categoryOptions } = useBudgetCategories(false);

    const isEdit = computed(() => Boolean(props.transaction.id));
    const currencySymbol = computed(() => symbolOf(openBudget.value.currency));

    const { form, resetForm, saveMessage } = useTransferForm({ props, isEdit });

    const originOptions = computed(() =>
      accounts.value.map((a) => ({
        label: a.name,
        value: a.id,
      })),
    );
    const destinationOptions = computed(() =>
      accounts.value
        .filter((a) => a.id != form.originId)
        .map((a) => ({
          label: a.name,
          value: a.id,
        })),
    );

    const hasToSelectCategory = computed(() => {
      return (
        getAccountById(form.originId)?.nature === 'budget' &&
        getAccountById(form.destinationId)?.nature === 'tracking'
      );
    });

    const handleSubmit = () => {
      alert.success(saveMessage.value);
      resetForm();
      emit('close');
    };

    return {
      originOptions,
      destinationOptions,
      categoryOptions,
      currencySymbol,
      form,
      handleSubmit,
      hasToSelectCategory,
      openBudget,
      t,
      st,
    };
  },
});
</script>

<style lang="scss" scoped>
.transfer-details {
  display: flex;
  flex-flow: column;

  &__control {
    margin-bottom: 16px;
  }

  &__accounts {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;

    &-input {
      flex-grow: 1;
    }
  }

  &__icon {
    padding: 0 8px 12px;
    align-self: flex-end;
  }
}
</style>
