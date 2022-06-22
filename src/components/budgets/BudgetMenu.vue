<template>
  <div class="budget-menu">
    <button
      class="budget-menu__button"
      aria-haspopup="menu"
      aria-controls="popup"
      :aria-expanded="isOpen"
      @click="toggle"
    >
      <span>
        <span class="budget-menu__button-line1">{{ openBudget.name }}</span>
        <span class="budget-menu__button-line2"
          >{{ currentUser.name }}•{{ currentUser.email }}</span
        >
      </span>
      <sad-icon class="budget-menu__button-caret" name="caret-down" />
    </button>

    <ul id="popup" class="budget-menu__popup" :class="popupClasses" role="menu">
      <span class="budget-menu__popup-caption">
        {{ t('BudgetMenu.allBudgets') }}
      </span>
      <li class="budget-menu__popup-item" role="none">
        <router-link :to="{ name: 'AllBudgets' }">
          <sad-icon class="budget-menu__popup-icon" name="notes-medical" />
          {{ t('BudgetMenu.allBudgets') }}
        </router-link>
      </li>
      <hr class="budget-menu__popup-separator" />
      <span class="budget-menu__popup-caption">
        {{ t('BudgetMenu.currentBudget') }}
      </span>
      <li class="budget-menu__popup-item" role="none">
        <a href="#" role="menuitem">
          <sad-icon class="budget-menu__popup-icon" name="pen" />
          {{ t('BudgetMenu.editBudget') }}
        </a>
      </li>
      <li class="budget-menu__popup-item" role="none">
        <a href="#" role="menuitem">
          <sad-icon class="budget-menu__popup-icon" name="cash-register" />
          {{ t('BudgetMenu.managePayees') }}
        </a>
      </li>
      <li class="budget-menu__popup-item" role="none">
        <a href="#" role="menuitem">
          <sad-icon class="budget-menu__popup-icon" name="tags" />
          {{ t('BudgetMenu.manageCategories') }}
        </a>
      </li>
      <hr class="budget-menu__popup-separator" />
      <span class="budget-menu__popup-caption">
        {{ t('BudgetMenu.user') }}
      </span>
      <li class="budget-menu__popup-item" role="none">
        <a href="#" role="menuitem">
          <sad-icon class="budget-menu__popup-icon" name="right-from-bracket" />
          {{ t('BudgetMenu.logout') }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import SadIcon from '@/components/sad/SadIcon.vue';
import { computed, defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { currentUser } from '@/repositories/auth';
import { openBudget } from '@/repositories/budgets';

export default defineComponent({
  components: {
    SadIcon,
  },
  setup() {
    const isOpen = ref(true);
    const { t } = useI18n();

    const toggle = () => (isOpen.value = !isOpen.value);
    const popupClasses = computed(() => ({
      'budget-menu__popup--open': isOpen.value,
    }));

    return { currentUser, isOpen, openBudget, popupClasses, t, toggle };
  },
});
</script>

<style lang="scss" scoped>
.budget-menu {
  &__button {
    cursor: pointer;
    margin: 0;
    padding: $base * 4 $base * 2;
    display: inline-block;
    position: relative;
    background: none;
    width: 100%;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    margin-bottom: $base * 4;
    transition: all ease 0.1s;

    &-line1 {
      display: block;
      font-size: var(--font-title2);
      font-weight: 600;
      text-align: left;
    }
    &-line2 {
      display: block;
      text-align: left;
    }
    &-caret {
      margin-right: $base * 2;
    }

    &:hover,
    &:focus {
      background: var(--sidebar-focus);
    }
  }
  &__popup {
    margin: 0;
    padding: $base * 3 0;
    overflow: hidden;
    list-style: none;
    display: none;
    position: absolute;
    border-radius: 5px;
    border: 1px solid var(--budget-menu-border);
    color: var(--text-primary);
    background: var(--budget-menu-popup-bg);
    box-shadow: var(--budget-menu-popup-shadow);
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

    &-caption {
      color: var(--text-primary);
      display: inline-block;
      font-size: var(--font-caption);
      font-weight: 600;
      padding: $base $base * 5;
    }

    &-item {
      padding: $base * 2 $base * 5;
      color: var(--text-secondary);

      a {
        display: flex;
        gap: $base * 2;
        align-items: center;
      }

      &:focus-within {
        background: var(--budget-menu-popup-focus);
        color: var(--text-primary);
      }
    }

    &-icon {
      width: 24px;
    }

    &-separator {
      border: 1px solid var(--budget-menu-separator);
      border-radius: 2px;
      margin: $base * 3 $base * 4;
    }
  }
}
</style>
