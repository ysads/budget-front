<template>
  <sad-modal
    :show="show"
    :title="t('CreateAccountModal.title')"
    data-test="modal"
    @close="$emit('close')"
  >
    <form
      class="create-account"
      data-test="form"
      @submit.prevent="handleSubmit"
    >
      <sad-select
        v-model="form.accountType"
        class="create-account__item"
        :label="t('CreateAccountModal.accountType')"
        :placeholder="t('placeholders.select')"
        :options="accountTypes"
        name="account-type"
        data-test="account-type"
      />
      <sad-input
        v-model="form.accountName"
        class="create-account__item"
        name="name"
        :label="t('CreateAccountModal.accountName')"
        data-test="account-name"
      />
      <sad-input
        v-model="form.currentBalance"
        class="create-account__item"
        name="currentBalance"
        :prefix="currencySymbol"
        :label="t('CreateAccountModal.currentBalance')"
        :tip="t('CreateAccountModal.currentBalanceTip')"
        data-test="current-balance"
      />
    </form>

    <template #footer>
      <footer class="create-account__footer">
        <sad-button size="normal" type="primary" @click="handleSubmit">
          {{ t('general.save') }}
        </sad-button>
      </footer>
    </template>
  </sad-modal>
</template>

<script lang="ts">
import SadButton from '@/components/sad/SadButton.vue';
import SadInput from '@/components/sad/SadInput.vue';
import SadModal from '@/components/sad/SadModal.vue';
import SadSelect from '@/components/sad/SadSelect.vue';
import alert from '@/support/alert';
import { useI18n } from 'vue-i18n';
import { createAccount } from '@/repositories/accounts';
import { ACCOUNT_TYPES } from '@/constants/account';
import { currencyToCents } from '@/support/money';
import { handleApiError } from '@/api/errors';
import { defineComponent, PropType } from 'vue';
import { Budget } from '@/types/models';
import useCreateAccountForm from '@/use/forms/create-account';

export default defineComponent({
  name: 'CreateAccountModal',

  props: {
    budget: {
      type: Object as PropType<Budget>,
      required: true,
    },
    show: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['close'],

  components: {
    SadButton,
    SadInput,
    SadModal,
    SadSelect,
  },

  setup(props, { emit }) {
    const { t } = useI18n();
    const { currencySymbol, form, resetForm } = useCreateAccountForm({
      budget: props.budget,
    });

    const accountTypes = ACCOUNT_TYPES.map((type) => ({
      label: t(`account.type.${type}`),
      value: type,
    }));

    const handleSubmit = async () => {
      try {
        await createAccount({
          ...form,
          currentBalance: currencyToCents(form.currentBalance, props.budget),
        });
        alert.success(t('created'));
        resetForm();
        emit('close');
      } catch (err) {
        handleApiError(err);
      }
    };

    return { accountTypes, currencySymbol, form, handleSubmit, t };
  },
});
</script>

<style lang="scss" scoped>
.create-account {
  &__select {
    width: 100%;
  }

  &__assistive {
    margin-bottom: $base * 4;
    margin-top: $base * 1;
  }

  &__item + &__item {
    margin-top: $base * 4;
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
