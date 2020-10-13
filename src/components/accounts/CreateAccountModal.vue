<template>
  <base-modal
    data-test="base-modal"
    :title="t('newAccount')"
    @close="$emit('close')"
  >
    <form
      class="create-account"
      data-test="form"
      @submit.prevent="handleSubmit"
    >
      <sad-label
        class="create-account__item"
        to="accountType"
        :text="st('accountType')"
        data-test="account-type"
      >
        <el-select
          v-model="form.accountType"
          class="create-account__select"
          :placeholder="st('accountTypePlaceholder')"
          data-test="select"
          @input="validate($v)"
        >
          <el-option
            v-for="type in accountTypes"
            :key="type.value"
            :label="type.label"
            :value="type.value"
            data-test="select-option"
          />
        </el-select>
      </sad-label>

      <sad-tip
        v-if="hasError($v.form.accountType, 'required')"
        class="create-account__assistive"
        variant="error"
        :text="t('validations.required')"
      />

      <sad-label
        class="create-account__item"
        to="name"
        :text="st('accountName')"
        data-test="account-name"
      >
        <sad-input
          v-model.trim="form.accountName"
          name="name"
          class="create-account__item-input"
          data-test="input"
          @input="validate($v.form.accountName)"
        />
      </sad-label>

      <sad-tip
        v-if="hasError($v.form.accountName, 'required')"
        class="create-account__assistive"
        variant="error"
        :text="t('validations.required')"
      />

      <sad-label
        class="create-account__item"
        to="currentBalance"
        :text="st('currentBalance')"
        data-test="current-balance"
      >
        <sad-input
          v-model.trim="form.currentBalance"
          name="currentBalance"
          class="create-account__item-input"
          data-test="input"
          :money="budgetCurrency"
        />
      </sad-label>

      <sad-tip
        class="create-account__assistive"
        data-test="current-balance-tip"
        :variant="currentBalanceVariant"
        :text="currentBalanceTip"
      />
    </form>

    <div slot="footer" class="create-account__footer">
      <sad-button
        size="normal"
        type="primary"
        @click="handleSubmit"
      >
        {{ t('save') }}
      </sad-button>
    </div>
  </base-modal>
</template>

<script>
import BaseModal from '@/components/BaseModal'
import SadButton from '@/components/sad/SadButton'
import SadInput from '@/components/sad/SadInput'
import SadLabel from '@/components/sad/SadLabel'
import SadTip from '@/components/sad/SadTip'
import { ACCOUNTS } from '@/store/namespaces'
import { ACCOUNT_TYPES } from '@/constants/account'
import { createNamespacedHelpers } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import { useI18n } from '@/use/i18n'
import { useValidation } from '@/use/validation'
import * as Money from '@/support/money'

const accountsHelper = createNamespacedHelpers(ACCOUNTS)

export default {
  name: 'CreateAccountModal',

  props: {
    budget: {
      type: Object,
      required: true,
    },
  },

  components: {
    BaseModal,
    SadButton,
    SadInput,
    SadLabel,
    SadTip,
  },

  data () {
    return {
      form: {
        accountType: '',
        accountName: '',
        budgetId: this.budget.id,
        currentBalance: '',
        payeeName: this.t('startingBalance'),
      },
    }
  },

  setup () {
    return {
      ...useI18n('CreateAccountModal'),
      ...useValidation(),
    }
  },

  validations: {
    form: {
      accountType: { required },
      accountName: { required },
      currentBalance: { required },
    },
  },

  computed: {
    accountTypes () {
      return ACCOUNT_TYPES.map(type => ({
        label: this.t(`account.type.${type}`),
        value: type,
      }))
    },

    budgetCurrency () {
      return Money.currencySettings(this.budget)
    },

    currentBalanceTip () {
      return this.hasError(this.$v.form.currentBalance, 'required')
        ? this.t('validations.required')
        : this.st('currentBalanceTip')
    },

    currentBalanceVariant () {
      return this.hasError(this.$v.form.currentBalance, 'required')
        ? 'error'
        : 'info'
    },
  },

  methods: {
    ...accountsHelper.mapActions(['createAccount']),

    handleSubmit () {
      if (!this.isValid(this.$v)) return

      this.createAccount({
        ...this.form,
        currentBalance: Money.currencyToCents(
          this.form.currentBalance, this.budget,
        ),
      })
      this.$emit('close')
    },
  },
}
</script>

<style lang="scss" scoped>
.create-account {
  &__select {
    width: 100%;
  }

  &__assistive {
    @include margin(top, 1);
    @include margin(bottom, 4);
  }

  &__item-input {
    width: 100%;
  }

  &__item + &__item {
    @include margin(top, 4);
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
