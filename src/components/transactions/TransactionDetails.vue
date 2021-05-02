<template>
  <sad-drawer
    class="transaction-details"
    :title="t('newTransaction')"
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
      v-model="form.payeeName"
      class="transaction-details__control"
      :error="errorMessage($v.form.payeeName)"
      :label="st('payee')"
      :options="payeeOptions"
      :placeholder="t('placeholders.select')"
      name="payee"
      allow-create
      data-test="payee"
      @blur="validate($v.form.payeeName)"
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
    <sad-date-picker
      v-model="form.referenceAt"
      class="transaction-details__control"
      :error="errorMessage($v.form.referenceAt)"
      :label="st('referenceAt')"
      :placeholder="st('referenceAt')"
      :format="openBudget.dateFormat"
      name="reference-at"
      data-test="reference-at"
      @blur="validate($v.form.referenceAt)"
      @input="validate($v.form.referenceAt)"
    />
    <sad-input
      v-model="form.amount"
      class="transaction-details__control"
      :error="errorMessage($v.form.amount)"
      :label="st('amount')"
      :money="money"
      name="amount"
      data-test="amount"
      @input="validate($v.form.amount)"
      @blur="validate($v.form.amount)"
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
      :value="Boolean(form.clearedAt)"
      name="cleared-at"
      data-test="cleared-at"
      @input="handleClearedAt"
    />
    <div slot="footer">
      <sad-button
        size="normal"
        type="primary"
        full-width
        data-test="save-btn"
        @click="handleSubmit"
      >
        {{ t('save') }}
      </sad-button>
    </div>
  </sad-drawer>
</template>

<script>
import alert from '@/support/alert'
import SadButton from '@/components/sad/SadButton'
import SadDatePicker from '@/components/sad/SadDatePicker'
import SadDrawer from '@/components/sad/SadDrawer'
import SadInput from '@/components/sad/SadInput'
import SadCheckbox from '@/components/sad/SadCheckbox'
import SadSelect from '@/components/sad/SadSelect'
import SadSwitch from '@/components/sad/SadSwitch'
import useBudgetCategories from '@/use/budget-categories'
import { currencySettings, currencyToCents } from '@/support/money'
import { createTransaction } from '@/repositories/transactions'
import { handleApiError } from '@/api/errors'
import { openBudget } from '@/repositories/budgets'
import { payees } from '@/repositories/payees'
import { required } from 'vuelidate/lib/validators'
import { useI18n } from '@/use/i18n'
import { useValidation } from '@/use/validation'
import { computed, defineComponent, reactive } from '@vue/composition-api'

export default defineComponent({
  name: 'TransactionDetails',

  props: {
    originAccount: {
      type: Object,
      required: true,
    },
  },

  components: {
    SadButton,
    SadDatePicker,
    SadDrawer,
    SadInput,
    SadCheckbox,
    SadSelect,
    SadSwitch,
  },

  setup ({ originAccount }, { emit }) {
    const { t, st } = useI18n('TransactionDetails')
    const { errorMessage, validate } = useValidation()
    const categoryOptions = useBudgetCategories()

    const money = currencySettings(openBudget.value)

    const payeeOptions = computed(() => payees.value.map(p => ({
      label: p.name,
      value: p.name,
    })))

    const form = reactive({
      amount: '',
      budgetId: openBudget.value.id,
      clearedAt: new Date().toISOString(),
      memo: '',
      categoryId: '',
      originId: originAccount.id,
      outflow: true,
      payeeName: '',
      referenceAt: new Date(),
    })

    const handleClearedAt = (checked) => {
      form.clearedAt = checked ? new Date().toISOString() : null
    }

    const handleSubmit = async () => {
      try {
        await createTransaction({
          ...form,
          amount: currencyToCents(form.amount, openBudget.value),
        })
        alert.success(st('created'))
        emit('close')
      } catch (err) {
        handleApiError(err)
      }
    }

    return {
      categoryOptions,
      errorMessage,
      form,
      handleClearedAt,
      handleSubmit,
      money,
      openBudget,
      payeeOptions,
      st,
      t,
      validate,
    }
  },

  validations: {
    form: {
      amount: { required },
      payeeName: { required },
      referenceAt: { required },
    },
  },
})
</script>

<style lang="scss" scoped>
.transaction-details {
  &__control + &__control {
    margin-top: $base*4;
  }

  &__outflow {
    display: inline-flex;
    justify-content: center;
    width: 100%;
  }
}
</style>
