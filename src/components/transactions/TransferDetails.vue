<template>
  <sad-drawer
    :title="title"
    :show="show"
    data-test="drawer"
    @close="$emit('close')"
  >
    <form class="transfer-details">
      <div class="transfer-details__accounts">
        <sad-select
          v-model="form.originId"
          class="transfer-details__accounts-input"
          :disabled="isEdit || Boolean(origin?.id)"
          :label="t('TransferDetails.origin')"
          :options="originOptions"
          :placeholder="t('placeholders.select')"
          name="transfer-origin"
          data-test="origin"
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
          :disabled="isEdit"
          :label="t('TransferDetails.destination')"
          :options="destinationOptions"
          :placeholder="t('placeholders.select')"
          name="transfer-destination"
          data-test="destination"
        />
      </div>
      <sad-select
        v-if="hasToSelectCategory"
        v-model="form.categoryId"
        class="transfer-details__control"
        name="transfer-category"
        :label="t('TransferDetails.category')"
        :options="categoryOptions"
        :placeholder="t('placeholders.select')"
        :tip="t('TransferDetails.categoryTip')"
        grouped
        data-test="category"
      />
      <sad-date-picker
        v-model="form.referenceAt"
        class="transfer-details__control"
        :label="t('TransferDetails.referenceAt')"
        :placeholder="t('TransferDetails.referenceAt')"
        :format="openBudget.dateFormat"
        name="transfer-reference-at"
        data-test="reference-at"
      />
      <sad-input
        v-model="form.amount"
        class="transfer-details__control"
        :label="t('TransferDetails.amount')"
        :prefix="currencySymbol"
        name="transfer-amount"
        data-test="amount"
      />
      <sad-input
        v-model="form.memo"
        class="transfer-details__control"
        :label="t('TransferDetails.memo')"
        :tip="t('TransferDetails.memoTip')"
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
import SadIcon from '@/components/sad/SadIcon.vue';
import SadInput from '@/components/sad/SadInput.vue';
import SadSelect from '@/components/sad/SadSelect.vue';
import useBudgetCategories from '@/use/budget-categories';
import useTransferForm from '@/use/forms/transfer';
import { useI18n } from 'vue-i18n';
import { openBudget } from '@/repositories/budgets';
import { accounts } from '@/repositories/accounts';
import { PropType, computed, defineComponent } from 'vue';
import { Account, Transfer } from '@/types/models';
import { symbolOf } from '@/support/currencies';
import { handleApiError } from '@/api/errors';
import { currencySettings, currencyToCents } from '@/support/money';

export default defineComponent({
  name: 'TransferDetails',

  props: {
    origin: {
      type: Object as PropType<Account | undefined>,
      default: undefined,
    },
    show: {
      type: Boolean,
      default: false,
    },
    transaction: {
      type: Object as PropType<Transfer>,
      default: () => ({} as Transfer),
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

  setup(props, { emit }) {
    const { t } = useI18n();
    const { categoryOptions } = useBudgetCategories(false);

    const isEdit = computed(() => Boolean(props.transaction.id));
    const currencySymbol = computed(() => symbolOf(openBudget.value.currency));
    const moneySettings = currencySettings(openBudget.value);

    const { form, resetForm, saveForm, saveMessage } = useTransferForm({
      props,
      isEdit,
      moneySettings,
    });

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

    const hasToSelectCategory = computed(() => form.type === 'spending');

    const title = computed(() =>
      isEdit.value ? t('TransferDetails.edit') : t('TransferDetails.add'),
    );

    const handleSubmit = async () => {
      try {
        await saveForm({
          ...form,
          amount: currencyToCents(form.amount, openBudget.value),
        });
        resetForm();
        emit('close');
        alert.success(saveMessage.value);
      } catch (err) {
        handleApiError(err);
      }
    };

    return {
      originOptions,
      destinationOptions,
      categoryOptions,
      currencySymbol,
      form,
      handleSubmit,
      hasToSelectCategory,
      isEdit,
      openBudget,
      t,
      title,
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
    align-self: flex-end;
    padding: 0 8px 12px;
  }
}
</style>
