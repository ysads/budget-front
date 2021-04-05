<template>
  <header class="month-header">
    <div class="month-header__item month-header__nav">
      <button
        class="month-header__nav-icon"
        @click="updateMonth(-1)"
      >
        <i class="icon fas fa-chevron-circle-left" />
      </button>

      <h2 class="month-header__month">
        {{ d(isoMonthToDate(month.isoMonth), 'monthOnly') }}
      </h2>

      <button
        class="month-header__nav-icon"
        @click="updateMonth(1)"
      >
        <i class="icon fas fa-chevron-circle-right" />
      </button>
    </div>
    <div
      class="month-header__item month-header__balance"
      :class="balanceClasses(month.toBeBudgeted)"
    >
      <p class="month-header__balance-title">
        {{ t('toBeBudgeted') }}
      </p>
      <p class="month-header__balance-currency" >
        {{ localize(month.toBeBudgeted, budget) }}
      </p>
    </div>
  </header>
</template>

<script>
import { balanceClasses, localize } from '@/support/money'
import { useI18n } from '@/use/i18n'
import { addMonths, isoMonthToDate } from '@/support/date'

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

  setup () {
    const { d, t } = useI18n('MonthHeader')

    return { balanceClasses, d, isoMonthToDate, localize, t }
  },

  methods: {
    updateMonth (delta) {
      const newMonth = addMonths(new Date(this.month.isoMonth), delta)
      this.$emit('update', newMonth)
    },
  },
}
</script>

<style lang="scss" scoped>
.month-header {
  align-items: center;
  background: var(--acc-header-bg);
  display: flex;
  padding: $base*3 $base*3 $base*3 $base*15;

  @include breakpoint(md) {
    padding: $base*3;
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

    &-icon {
      cursor: pointer;
      font-size: 18px;
      padding: 0 $base*2;
    }
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
