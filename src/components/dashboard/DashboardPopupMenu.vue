<template>
  <ul :id="id" class="dashboard-popup" :class="classes" role="menu">
    <span class="dashboard-popup__caption">
      {{ t('DashboardPopupMenu.allBudgets') }}
    </span>
    <li
      v-for="budget in allBudgets"
      :key="budget.id"
      class="dashboard-popup__item"
      role="none"
    >
      <router-link
        :to="{ name: 'Budget', params: { budgetId: budget.id } }"
        @click="$emit('close')"
      >
        <sad-icon class="dashboard-popup__icon" name="folder" size="medium" />
        {{ budget.name }}
        <span class="dashboard-popup__currency">{{ budget.currency }}</span>
      </router-link>
    </li>

    <li class="dashboard-popup__item" role="none">
      <button @click="$emit('close')">
        <sad-icon
          class="dashboard-popup__icon"
          name="folder-plus"
          size="medium"
        />
        {{ t('DashboardPopupMenu.addBudget') }}
      </button>
    </li>

    <hr class="dashboard-popup__separator" />

    <span class="dashboard-popup__caption">
      {{ t('DashboardPopupMenu.currentBudget') }}
    </span>
    <li class="dashboard-popup__item" role="none">
      <a href="#" role="menuitem">
        <sad-icon class="dashboard-popup__icon" name="pen" size="medium" />
        {{ t('DashboardPopupMenu.editBudget') }}
      </a>
    </li>
    <li class="dashboard-popup__item" role="none">
      <a href="#" role="menuitem">
        <sad-icon
          class="dashboard-popup__icon"
          name="cash-register"
          size="medium"
        />
        {{ t('DashboardPopupMenu.managePayees') }}
      </a>
    </li>
    <li class="dashboard-popup__item" role="none">
      <a href="#" role="menuitem">
        <sad-icon class="dashboard-popup__icon" name="tags" size="medium" />
        {{ t('DashboardPopupMenu.manageCategories') }}
      </a>
    </li>

    <hr class="dashboard-popup__separator" />

    <span class="dashboard-popup__caption">
      {{ t('DashboardPopupMenu.user') }}
    </span>
    <li class="dashboard-popup__item" role="none">
      <a href="#" role="menuitem">
        <sad-icon
          class="dashboard-popup__icon"
          name="right-from-bracket"
          size="medium"
        />
        {{ t('DashboardPopupMenu.logout') }}
      </a>
    </li>
  </ul>
</template>

<script lang="ts">
import { Budget } from '@/types/models';
import { computed, defineComponent, PropType } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  props: {
    allBudgets: {
      type: Array as PropType<Budget[]>,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    open: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { t } = useI18n();

    const classes = computed(() => ({
      'dashboard-popup--open': props.open,
    }));

    return {
      classes,
      t,
    };
  },
});
</script>

<style lang="scss" scoped>
.dashboard-popup {
  background: var(--budget-menu-popup-bg);
  border-radius: 5px;
  border: 1px solid var(--budget-menu-border);
  box-shadow: var(--budget-menu-popup-shadow);
  color: var(--text-primary);
  display: none;
  list-style: none;
  margin: 0;
  padding: $base * 3 0;
  position: absolute;
  overflow: hidden;
  width: calc(100% - var(--sidebar-horizontal-padding));

  @include breakpoint(md) {
    width: var(--sidebar-width-md);
  }

  @include breakpoint(lg) {
    width: var(--sidebar-width-lg);
  }

  @include breakpoint(xl) {
    width: var(--sidebar-width-xl);
  }

  &--open {
    display: block;
  }

  &__currency {
    font-size: var(--font-caption);
  }

  &__caption {
    color: var(--text-primary);
    display: inline-block;
    font-size: var(--font-caption);
    font-weight: 600;
    padding: $base $base * 5;
  }

  &__separator {
    border: 1px solid var(--budget-menu-separator);
    border-radius: 2px;
    margin: $base * 3 0 $base * 4;
  }
}
</style>
