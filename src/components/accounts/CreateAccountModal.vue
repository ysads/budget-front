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

      <sad-label
        class="create-account__item"
        to="name"
        :text="st('accountName')"
        data-test="account-name"
      >
        <sad-input
          v-model="form.accountName"
          name="name"
          class="create-account__item-input"
          data-test="input"
        />
      </sad-label>

      <sad-label
        class="create-account__item"
        to="currentBalance"
        :text="st('currentBalance')"
        data-test="current-balance"
      >
        <sad-input
          v-model="form.currentBalance"
          name="currentBalance"
          class="create-account__item-input"
          data-test="input"
          :money="budgetCurrency"
        />
      </sad-label>
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
import SadInput from '@/components/sad/SadInput'
import SadLabel from '@/components/sad/SadLabel'
import SadButton from '@/components/sad/SadButton'
import { ACCOUNTS } from '@/store/namespaces'
import { ACCOUNT_TYPES } from '@/constants/account'
import { createNamespacedHelpers } from 'vuex'
import { useI18n } from '@/use/i18n'
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
    return { ...useI18n('CreateAccountModal') }
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
  },

  methods: {
    ...accountsHelper.mapActions(['createAccount']),

    handleSubmit () {
      try {
        this.createAccount({
          ...this.form,
          currentBalance: Money.currencyToCents(
            this.form.currentBalance, this.budget,
          ),
        })
      } catch (exc) {
        console.log(exc)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.create-account {
  &__select {
    width: 100%;
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
