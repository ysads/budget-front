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
      <div class="create-account__item">
        <sad-label
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
      </div>

      <sad-input
        v-model.trim="form.accountName"
        class="create-account__item"
        name="name"
        :label="st('accountName')"
        :error="errorMessage($v.form.accountName)"
        data-test="account-name"
        @input="validate($v.form.accountName)"
      />

      <sad-input
        v-model.trim="form.currentBalance"
        class="create-account__item"
        name="currentBalance"
        :label="st('currentBalance')"
        :error="errorMessage($v.form.currentBalance)"
        :tip="st('currentBalanceTip')"
        :money="budgetCurrency"
        data-test="current-balance"
      />
    </form>

    <template #footer>
      <footer class="create-account__footer">
        <sad-button
          size="normal"
          type="primary"
          @click="handleSubmit"
        >
          {{ t('save') }}
        </sad-button>
      </footer>
    </template>
  </base-modal>
</template>

<script>
import BaseModal from '@/components/BaseModal'
import SadButton from '@/components/sad/SadButton'
import SadInput from '@/components/sad/SadInput'
import SadLabel from '@/components/sad/SadLabel'
import SadTip from '@/components/sad/SadTip'
import alert from '@/support/alert'
import { createAccount } from '@/repositories/accounts'
import { ACCOUNT_TYPES } from '@/constants/account'
import { required } from 'vuelidate/lib/validators'
import { useI18n } from '@/use/i18n'
import { useValidation } from '@/use/validation'
import { currencySettings, currencyToCents } from '@/support/money'
import { handleApiError } from '@/api/errors'

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
      return currencySettings(this.budget)
    },
  },

  methods: {
    async handleSubmit () {
      if (!this.isValid(this.$v)) return

      try {
        await createAccount({
          ...this.form,
          currentBalance: currencyToCents(
            this.form.currentBalance, this.budget,
          ),
        })
        alert.success(this.st('created'))
        this.$emit('close')
      } catch (err) {
        handleApiError(err)
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

  &__assistive {
    @include margin(top, 1);
    @include margin(bottom, 4);
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
