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
        <span class="budget-menu__button-line2">{{ currentUser.name }}</span>
      </span>
      <sad-icon class="budget-menu__button-caret" name="sort" />
    </button>

    <budget-details :show="true" :budget="budgetToEdit" />
  </div>
</template>

<script lang="ts">
import SadIcon from '@/components/sad/SadIcon.vue';
import { defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { currentUser } from '@/repositories/auth';
import { openBudget, allBudgets } from '@/repositories/budgets';
import BudgetDetails from './BudgetDetails.vue';
import { Budget } from '@/types/models';

export default defineComponent({
  components: {
    BudgetDetails,
    SadIcon,
  },
  setup() {
    const budgetToEdit = ref<Budget | null>(null);
    const { t } = useI18n();

    const editBudget = (budget: Budget) => budgetToEdit.value = budget;
    const closeBudgetDetails = () => budgetToEdit.value = null;

    return {
      allBudgets,
      budgetToEdit,
      currentUser,
      openBudget,
      editBudget,
      closeBudgetDetails,
      t,
    };
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
    &-item {
      padding: $base * 2 $base * 5;
      color: var(--text-secondary);

      * {
        display: flex;
        gap: $base * 2;
        align-items: baseline;
      }

      &:focus-within {
        background: var(--budget-menu-popup-focus);
        color: var(--text-primary);
      }
    }
  }
}
</style>
