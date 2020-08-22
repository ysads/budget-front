<template>
  <base-modal
    data-test="base-modal"
    :title="$t('newAccount')"
    @close="$emit('close')"
  >
    <el-form
      label-position="top"
      class="create-account"
      :rules="rules"
    >
      <el-form-item :label="$t('accounts.CreateAccountModal.type')">
        <el-select
          v-model="account.type"
          placeholder="Select"
        >
          <el-option
            v-for="type in accountTypes"
            :key="type.value"
            :label="type.label"
            :value="type.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('accounts.CreateAccountModal.accountName')">
        <el-input
          v-model="account.name"
        />
      </el-form-item>

      <el-form-item :label="$t('accounts.CreateAccountModal.currentBalance')">
        <el-input
          v-model="account.startingBalance"
          placeholder="Please input"
        />
      </el-form-item>
    </el-form>
  </base-modal>
</template>

<script>
import BaseModal from '@/components/BaseModal'
import { ACCOUNT_TYPES } from '@/constants/account'

export default {
  name: 'CreateAccountModal',

  components: {
    BaseModal,
  },

  data () {
    return {
      account: {
        type: '',
        name: '',
        startingBalance: 0,
      },
    }
  },

  computed: {
    accountTypes () {
      return ACCOUNT_TYPES.map(type => ({
        label: this.$t(`account.type.${type}`),
        value: type,
      }))
    },

    rules () {
      return {
        accountType: [{
          required: true,
          message: this.$localt('accoutType.required'),
          trigger: 'blur',
        }],
        name: [{
          required: true,
          message: this.$localt('name.required'),
          trigger: 'blur',
        }],
        startingBalance: [{
          required: true,
          message: this.$localt('startingBalance.required'),
          trigger: 'blur',
        }],
      }
    },
  },

  methods: {
    $localt (msg) {
      return this.$t(`CreateAccountModal.${msg}`)
    },
  },
}
</script>

<style lang="scss" scoped>
.create-account {
}
</style>
