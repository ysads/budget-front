<template>
  <div class="transaction-table-header">
    <span class="transaction-table-header__date" data-test="date">
      {{ st('date') }}
    </span>
    <span class="transaction-table-header__payee" data-test="payee">
      {{ st('payee') }}
    </span>
    <span class="transaction-table-header__category" data-test="category">
      {{ st('category') }}
    </span>
    <span class="transaction-table-header__memo" data-test="memo">
      {{ st('memo') }}
    </span>
    <span class="transaction-table-header__amount" data-test="amount">
      {{ st('amount') }}
    </span>
    <span class="transaction-table-header__cleared" data-test="cleared">
      {{ st('cleared') }}
    </span>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import useI18n from '@/use/i18n';

export default defineComponent({
  name: 'TransactionTableHeader',

  setup() {
    const { st } = useI18n('TransactionTableHeader');

    return { st };
  },
});
</script>

<style lang="scss" scoped>
.transaction-table-header {
  align-items: center;
  display: flex;
  gap: $base * 4;
  font-weight: 500;
  padding: $base * 2 $base * 4;
  border-bottom: 1px solid var(--table-separator);

  @extend %body-1;

  &__date {
    flex-basis: 10%;
  }
  &__payee {
    flex-basis: 15%;
  }
  &__category {
    flex-basis: 25%;
  }
  &__memo {
    flex-basis: 20%;
  }
  &__cleared {
    flex-basis: 75px;
    text-align: right;
  }
  &__amount {
    flex-grow: 1;
    text-align: right;
  }
}
</style>
