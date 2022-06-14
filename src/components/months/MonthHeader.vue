<template>
  <header class="month-header">
    <div class="month-header__nav">
      <button
        class="month-header__btn"
        :aria-label="t('MonthHeader.prevMonth')"
        data-test="prev"
        @click="updateMonth(-1)"
      >
        <sad-icon
          class="month-header__nav-icon"
          name="chevron-circle-left"
          size="medium"
          data-test="icon-prev"
        />
      </button>
      <h2 class="month-header__month" data-test="month-name">
        {{ monthText }}
      </h2>
      <button
        class="month-header__btn"
        :aria-label="t('MonthHeader.nextMonth')"
        data-test="next"
        @click="updateMonth(1)"
      >
        <sad-icon
          class="month-header__nav-icon"
          name="chevron-circle-right"
          size="medium"
          data-test="icon-next"
        />
      </button>
    </div>
    <div
      class="month-header__balance"
      :class="balanceClasses(month.toBeBudgeted)"
      data-test="to-be-budgeted"
    >
      <p class="month-header__balance-title">
        {{ t('MonthHeader.toBeBudgeted') }}
      </p>
      <p class="month-header__balance-currency">
        {{ format(month.toBeBudgeted, moneySettings) }}
      </p>
    </div>
  </header>
</template>

<script lang="ts">
import { balanceClasses, currencySettings, format } from '@/support/money';
import { addMonths, isoMonthToDate } from '@/support/date';
import useI18n from '@/use/i18n';
import SadIcon from '@/components/sad/SadIcon.vue';
import { computed, defineComponent, PropType, SetupContext, watch } from 'vue';
import { Budget, Month } from '@/types/models';
import { eventBus, Events } from '@/events';

export default defineComponent({
  props: {
    budget: {
      type: Object as PropType<Budget>,
      required: true,
    },
    month: {
      type: Object as PropType<Month>,
      required: true,
    },
  },

  components: {
    SadIcon,
  },

  setup(props, { emit }: SetupContext) {
    const { d, t } = useI18n('MonthHeader');
    const monthText = computed(() => {
      return d(isoMonthToDate(props.month.isoMonth), 'monthOnly');
    });
    const moneySettings = currencySettings(props.budget);

    const updateMonth = (delta: number) => {
      const newMonth = addMonths(isoMonthToDate(props.month.isoMonth), delta);
      emit('update', newMonth);
    };

    watch(
      () => props.month,
      () => eventBus.emit(Events.ANNOUNCE, { message: monthText.value }),
    );

    return {
      balanceClasses,
      format,
      moneySettings,
      monthText,
      t,
      updateMonth,
    };
  },
});
</script>

<style lang="scss" scoped>
.month-header {
  align-items: center;
  background: var(--month-header-bg);
  display: flex;
  flex-flow: column;
  gap: 12px;
  padding: $base * 3 $base * 3 $base * 3 $base * 15;

  @include breakpoint(md) {
    flex-flow: row;
    justify-content: space-evenly;
    padding: $base * 3;
  }

  &__btn {
    background-color: transparent;
    border: 2px solid transparent;
    border-radius: var(--month-header-btn-radius);
    cursor: pointer;
    padding: 4px;

    &:focus {
      border: 2px solid var(--month-header-btn-focus-border);
    }
  }

  &__nav {
    align-items: center;
    color: var(--month-header-text);
    display: flex;
    gap: 12px;
    justify-content: space-between;

    @include breakpoint(md) {
      flex-basis: 50%;
    }

    @include breakpoint(xl) {
      flex-basis: 30%;
    }
  }

  &__month {
    font-size: var(--font-title1);
    font-weight: 600;
    text-transform: capitalize;
  }

  &__balance {
    border-radius: var(--balance-pill-radius);
    padding: $base * 2;
    text-align: center;

    @include breakpoint(md) {
      flex-basis: 50%;
    }

    @include breakpoint(lg) {
      flex-basis: 30%;
    }

    &-currency {
      font-size: var(--font-title2);
      font-weight: 600;
    }
  }
}

.negative {
  background: var(--balance-neg-bg);
  color: var(--balance-neg-text);
}

.positive {
  background: var(--balance-pos-bg);
  color: var(--balance-pos-text);
}
</style>
