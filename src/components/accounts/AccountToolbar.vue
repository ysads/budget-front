<template>
  <div class="account-toolbar">
    <sad-button
      class="account-toolbar__button"
      icon="file-invoice-dollar"
      type="ghost"
      size="small"
      data-test="new-transaction"
      @click="toggle('transactionDrawer')"
    >
      {{ t('AccountToolbar.newTransaction') }}
    </sad-button>
    <sad-button
      class="account-toolbar__button"
      icon="exchange-alt"
      type="ghost"
      size="small"
      data-test="new-transaction"
      @click="toggle('transferDrawer')"
    >
      {{ t('AccountToolbar.newTransfer') }}
    </sad-button>
    <transaction-details
      :show="isVisible.transactionDrawer"
      :account="account"
      data-test="transaction-drawer"
      @close="toggle('transactionDrawer')"
    />
    <transfer-details
      :show="isVisible.transferDrawer"
      :origin="account"
      @close="toggle('transferDrawer')"
    />
  </div>
</template>

<script lang="ts">
import SadButton from '@/components/sad/SadButton.vue';
import TransactionDetails from '@/components/transactions/TransactionDetails.vue';
import TransferDetails from '@/components/transactions/TransferDetails.vue';
import { useI18n } from 'vue-i18n';
import { Account } from '@/types/models';
import { defineComponent, PropType, reactive } from 'vue';

export default defineComponent({
  props: {
    account: {
      type: Object as PropType<Account | undefined>,
      default: null,
    },
  },

  components: {
    SadButton,
    TransactionDetails,
    TransferDetails,
  },

  setup() {
    const { t } = useI18n();
    const isVisible = reactive({
      transactionDrawer: false,
      transferDrawer: false,
    });
    const toggle = (prop: keyof typeof isVisible) => {
      isVisible[prop] = !isVisible[prop];
    };

    return { isVisible, t, toggle };
  },
});
</script>

<style lang="scss" scoped>
.account-toolbar {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  padding: $base * 2 $base * 4;
}
</style>
