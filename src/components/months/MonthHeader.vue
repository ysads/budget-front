<template>
  <header class="month-header">
    <div class="month-header__item month-header__nav">
      <sad-icon
        class="month-header__nav-icon"
        name="chevron-circle-left"
        size="medium"
        clickable
        data-test="prev"
        @click="updateMonth(-1)"
      />

      <h2 class="month-header__month" data-test="month-name">
        {{ d(isoMonthToDate(month.isoMonth), 'monthOnly') }}
      </h2>

      <sad-icon
        class="month-header__nav-icon"
        name="chevron-circle-right"
        size="medium"
        clickable
        data-test="next"
        @click="updateMonth(1)"
      />
    </div>
    <div
      class="month-header__item month-header__balance"
      :class="balanceClasses(month.toBeBudgeted)"
      data-test="to-be-budgeted"
    >
      <p class="month-header__balance-title">
        {{ t('toBeBudgeted') }}
      </p>
      <p class="month-header__balance-currency">
        {{ localize(month.toBeBudgeted, budget) }}
      </p>
    </div>
  </header>
</template>

<script lang="ts">
import { balanceClasses, localize } from '@/support/money';
import { addMonths, isoMonthToDate } from '@/support/date';
import useI18n from '@/use/i18n';
import SadIcon from '@/components/sad/SadIcon.vue';
import { SetupContext } from '@vue/runtime-core';

export default {
  props: {
    budget: {
      type: Object,
      required: true,
    },
    month: {
      type: Object,
      required: true,
    },
  },

  components: {
    SadIcon,
  },

  setup(props: any, { emit }: SetupContext) {
    const { d, t } = useI18n('MonthHeader');

    const updateMonth = (delta: number) => {
      const newMonth = addMonths(isoMonthToDate(props.month.isoMonth), delta);
      emit('update', newMonth);
    };

    return { balanceClasses, d, isoMonthToDate, localize, t, updateMonth };
  },
};
</script>

<style lang="scss" scoped>
.month-header {
  align-items: center;
  background: var(--acc-header-bg);
  display: flex;
  justify-content: space-evenly;
  padding: $base * 3 $base * 3 $base * 3 $base * 15;

  @include breakpoint(md) {
    padding: $base * 3;
  }

  &__item {
    flex-basis: 50%;

    @include breakpoint(md) {
      flex-basis: 30%;
    }
  }

  &__nav {
    align-items: center;
    color: var(--month-header-text);
    display: flex;
    justify-content: space-between;
    margin-right: $base * 6;
  }

  &__month {
    text-transform: capitalize;

    @extend %h2;
  }

  &__balance {
    border-radius: $radius-4;
    color: var(--month-header-tbb-text);
    padding: $base * 2;
    text-align: center;

    &-title {
      @extend %caption;
    }

    &-currency {
      @extend %h1;
    }
  }
}

.positive {
  background: var(--balance-positive);
}

.negative {
  background: var(--balance-negative);
}
</style>
