<template>
  <sad-drawer
    class="transaction-details"
    :title="t('newTransaction')"
    data-test="drawer"
    @close="$emit('close')"
  >
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
      :error="errorMessage($v.form.categoryId)"
      :label="st('category')"
      :options="categoryOptions"
      :placeholder="t('placeholders.select')"
      grouped
      data-test="category"
      @blur="validate($v.form.categoryId)"
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
      v-model="form.clearedAt"
      class="transaction-details__control"
      :label="st('clearedAt')"
      :tip="st('clearedAtTip')"
      name="cleared-at"
      data-test="cleared-at"
    />
    <div slot="footer">
      <sad-button
        size="normal"
        type="primary"
        full-width
        data-test="save-btn"
      >
        {{ t('save') }}
      </sad-button>
    </div>
  </sad-drawer>
</template>

<script>
import SadButton from '@/components/sad/SadButton'
import SadDatePicker from '@/components/sad/SadDatePicker'
import SadDrawer from '@/components/sad/SadDrawer'
import SadInput from '@/components/sad/SadInput'
import SadCheckbox from '@/components/sad/SadCheckbox'
import SadSelect from '@/components/sad/SadSelect'
import { currencySettings } from '@/support/money'
import { categoriesGroupedByGroupId } from '@/repositories/categories'
import { categoryGroupById } from '@/repositories/category-groups'
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
  },

  setup ({ originAccount }) {
    const { t, st } = useI18n('TransactionDetails')
    const { errorMessage, validate } = useValidation()

    const money = currencySettings(openBudget.value)

    const payeeOptions = computed(() => payees.value.map(p => ({
      label: p.name,
      value: p.name,
    })))
    const categoryOptions = computed(
      () => Object
        .entries(categoriesGroupedByGroupId.value)
        .map(([groupId, categories]) => ({
          label: categoryGroupById(groupId).name,
          options: categories.map(category => ({
            label: category.name,
            value: category.id,
          })),
        })),
    )

    const form = reactive({
      amount: '',
      clearedAt: false,
      memo: '',
      categoryId: '',
      originId: originAccount.id,
      payeeName: '',
      referenceAt: new Date(),
    })

    return {
      categoryOptions,
      errorMessage,
      form,
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
      categoryId: { required },
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
}
</style>
