<template>
  <div
    class="transaction-table-row"
    tabindex="0"
    role="button"
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
          size="tiny"
          aria-hidden
        />
        {{ destinationAccount.name }}
      </span>
      <span v-else class="transaction-table-row__payee" data-test="payee">
        {{ transaction.payeeName }}
      </span>
      <div class="transaction-table-row__category-mobile">
        {{ budgetCategoryName }}
      </div>
      <div class="transaction-table-row__bottom">
        <span class="transaction-table-row__date" data-test="date">
          {{ d(new Date(transaction.referenceAt), 'short') }}
        </span>
        <span
          v-if="transaction.memo"
          class="transaction-table-row__separator"
          aria-hidden
        >
          •
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
    <div class="transaction-table-row__category-desktop">
      {{ budgetCategoryName }}
    </div>
    <div class="transaction-table-row__amount">
      <span :class="balanceClasses(transaction.amount)" data-test="amount">
        {{ format(transaction.amount, moneySettings) }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { format, balanceClasses, currencySettings } from '@/support/money';
import { Budget, Transaction } from '@/types/models';
import { useI18n } from 'vue-i18n';
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
    const { d } = useI18n();
    const { categoryName } = useBudgetCategories();
    const budgetCategoryName = categoryName(props.transaction);

    const moneySettings = currencySettings(props.budget);

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
      d,
      isTransfer,
      payeeAbbrev,
      moneySettings,
      format,
    };
  },
});
</script>

<style lang="scss" scoped>
.transaction-table-row {
  align-items: center;
  cursor: pointer;
  display: grid;
  gap: 16px;
  grid-template-columns: 3fr 1fr;
  line-height: 1.5;
  padding: 16px;
  transition: all ease-in-out 0.15s;

  @include breakpoint(sm) {
    grid-template-columns: 32px 3fr 1fr;
  }

  @include breakpoint(md) {
    grid-template-columns: 50px 3fr 3fr 1fr;
  }

  &:hover,
  &:focus {
    background: var(--row-focus-bg);
  }

  &__category-desktop {
    display: none;
    flex: 1;
    text-align: left;

    @include breakpoint(sm) {
      display: block;
    }
  }

  &__category-mobile {
    display: block;
    text-align: left;

    @include breakpoint(md) {
      display: none;
    }
  }

  &__payee {
    color: var(--text-primary);
  }

  &__amount {
    font-size: var(--font-body2);
    justify-self: end;
  }

  &__memo,
  &__date {
    color: var(--text-secondary);
  }

  &__separator {
    color: var(--text-secondary);
    margin: 0 4px;
  }

  &__icon {
    color: var(--transaction-sep-icon);
    margin: 0 8px;
  }

  &__img {
    background: var(--transaction-payee-bg);
    border-radius: 50%;
    color: var(--transaction-payee-text);
    display: grid;
    display: none;
    font-size: 14px;
    font-weight: 600;
    height: 32px;
    letter-spacing: 1px;
    padding: 10px;
    place-content: center;
    text-transform: uppercase;
    transition-duration: 0.3s;
    transition-property: width height;
    transition-timing-function: ease-in-out;
    width: 32px;

    @include breakpoint(sm) {
      display: grid;
      height: 32px;
      width: 32px;
    }

    @include breakpoint(md) {
      display: grid;
      height: 50px;
      width: 50px;
    }
  }
}

.positive {
  background: var(--balance-pos-bg);
  border-radius: var(--balance-pill-radius);
  color: var(--balance-pos-text);
  font-weight: 600;
  padding: 2px 4px;
}
</style>
