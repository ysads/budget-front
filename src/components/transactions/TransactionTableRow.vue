<template>
  <div
    class="transaction-table-row"
    tabindex="0"
    @keydown.space="$emit('select')"
    @keydown.enter="$emit('select')"
    @click="$emit('select')"
  >
    <div class="transaction-table-row__img">
      <sad-icon v-if="isTransfer" name="arrow-circle-right" color="inherit" />
      <span v-else>
        {{ payeeAbbrev }}
      </span>
    </div>
    <div class="transaction-table-row__left">
      <span
        v-if="isTransfer"
        class="transaction-table-row__transaction"
        data-test="payee"
      >
        {{ originAccount.name }}
        <sad-icon
          class="transaction-table-row__icon"
          name="arrow-circle-right"
          size="small"
          color="green"
          aria-hidden
        />
        {{ destinationAccount.name }}
      </span>
      <span v-else class="transaction-table-row__payee" data-test="payee">
        {{ transaction.payeeName }}
      </span>
      <div class="transaction-table-row__bottom">
        <span class="transaction-table-row__date" data-test="date">
          {{ d(new Date(transaction.referenceAt), 'short') }}
        </span>
        <span
          v-if="transaction.memo"
          class="transaction-table-row__memo"
          data-test="memo"
        >
          {{ transaction.memo }}
        </span>
      </div>
    </div>
    <!-- <span class="transaction-table-row__category" data-test="category">
      {{ budgetCategoryName }}
    </span> -->
    <span
      class="transaction-table-row__amount"
      :class="balanceClasses(transaction.amount)"
      data-test="amount"
    >
      {{ localize(transaction.amount, budget) }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { localize, balanceClasses } from '@/support/money';
import { Budget, Transaction } from '@/types/models';
import useI18n from '@/use/i18n';
import useBudgetCategories from '@/use/budget-categories';
import useTransfer from '@/use/transfer';
import SadIcon from '@/components/sad/SadIcon.vue';

export default defineComponent({
  name: 'TransactionTableRow',

  props: {
    budget: {
      type: Object as PropType<Budget>,
      required: true,
    },
    transaction: {
      type: Object as PropType<Transaction>,
      required: true,
    },
  },

  components: {
    SadIcon,
  },

  emits: ['select'],

  setup(props) {
    const { d, st } = useI18n('TransactionTableRow');
    const { categoryName } = useBudgetCategories();
    const budgetCategoryName = categoryName(props.transaction);

    const clearedIcon = props.transaction.clearedAt ? 'check' : 'clock';

    const clearedColor = props.transaction.clearedAt ? 'green' : 'disabled';

    const clearedTitle = props.transaction.clearedAt
      ? st('clearedTitle')
      : st('unclearedTitle');

    const { originAccount, destinationAccount, isTransfer } = useTransfer(
      props.transaction,
    );

    const payeeAbbrev = isTransfer.value
      ? ''
      : props.transaction.payeeName.indexOf(' ') > -1
      ? props.transaction.payeeName
          .split(' ')
          .map((c) => c[0])
          .join('')
      : props.transaction.payeeName.substring(0, 2);

    return {
      originAccount,
      destinationAccount,
      balanceClasses,
      budgetCategoryName,
      clearedIcon,
      clearedColor,
      clearedTitle,
      d,
      isTransfer,
      payeeAbbrev,
      localize,
    };
  },
});
</script>

<style lang="scss" scoped>
.transaction-table-row {
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  align-items: center;
  font-size: 16px;
  line-height: 22.4px;
  cursor: pointer;
  border-radius: 8px;
  border: 1px solid rgb(233, 233, 233);
  background: #fff;

  &:hover,
  &:focus {
    border: 1px solid rgb(54, 161, 139);
    transition: border ease-in 0.15s;
  }

  &__left {
    flex: 1;
    margin-left: 20px;
  }

  &__payee {
    color: rgb(18, 18, 18);
  }

  &__memo,
  &__date {
    color: #696969;
  }

  &__memo::before {
    content: ' • ';
    margin: 0 8px;
  }

  &__icon {
    margin: 0 12px;
  }

  &__img {
    background: #f2ece1;
    color: #c89d58;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 1px;
    border-radius: 50%;
    padding: 10px;
    width: 50px;
    height: 50px;
    display: grid;
    place-content: center;
  }

  //   &__category {
  //     flex-basis: 25%;
  //   }

  //   &__memo {
  //     flex-basis: 20%;
  //   }

  //   &__cleared {
  //     flex-basis: 75px;
  //     text-align: right;
  //   }

  //   &__amount {
  //     flex-grow: 1;
  //     flex-shrink: 0;
  //     padding: $base;
  //     text-align: right;

  //     @extend %semi-bold;
  //   }
}

// .negative {
//   color: var(--balance-negative);
// }

.positive {
  color: rgb(54, 161, 139);
  background: rgb(232, 242, 238);
  padding: 2px 4px;
  border-radius: 8px;
  font-weight: 600;
  //   color: var(--balance-positive);
}
</style>
