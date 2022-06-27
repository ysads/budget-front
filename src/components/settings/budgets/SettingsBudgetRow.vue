<template>
  <div
    class="budget-settings-row"
    tabindex="0"
    role="button"
    @keydown.space="$emit('select')"
    @keydown.enter="$emit('select')"
    @click="$emit('select')"
  >
    <div class="budget-settings-row__img">
      <span>
        {{ currencySymbol }}
      </span>
    </div>
    <div class="budget-settings-row__left">
      <span class="budget-settings-row__payee" data-test="payee">
        {{ budget.name }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Budget } from '@/types/models';
import { symbolOf } from '@/support/currencies';

export default defineComponent({
  name: 'SettingsBudgetRow',

  props: {
    budget: {
      type: Object as PropType<Budget>,
      required: true,
    },
  },

  emits: ['select', 'check'],

  setup(props) {
    const currencySymbol = symbolOf(props.budget.currency);

    return { currencySymbol };
  },
});
</script>

<style lang="scss" scoped>
.budget-settings-row {
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

    @include breakpoint(md) {
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
