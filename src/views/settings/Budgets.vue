<template>
  <div class="budgets">
    <settings-header> Manage budgets </settings-header>
    <sad-button
      class="budgets__new-btn"
      icon="notes-medical"
      type="ghost"
      size="small"
    >
      Add budget
    </sad-button>
    <div class="budgets__main">
      <div class="budgets__list">
        <settings-budget-row
          v-for="budget in allBudgets"
          :key="budget.id"
          :budget="budget"
          @select="selectToEdit(budget)"
        />
      </div>
      <settings-budget-details :budget="selectedBudget" />
    </div>
  </div>
</template>

<script lang="ts">
import SettingsHeader from '@/components/settings/SettingsHeader.vue';
import SadButton from '@/components/sad/SadButton.vue';
import { allBudgets, getBudgets } from '@/repositories/budgets';
import { defineComponent, onMounted, ref } from 'vue';
import SettingsBudgetRow from '@/components/settings/budgets/SettingsBudgetRow.vue';
import SettingsBudgetDetails from '@/components/settings/budgets/SettingsBudgetDetails.vue';
import { Budget } from '@/types/models';

export default defineComponent({
  components: {
    SadButton,
    SettingsHeader,
    SettingsBudgetRow,
    SettingsBudgetDetails,
  },
  setup() {
    const selectedBudget = ref<Budget | null>(null);
    const selectToEdit = (budget: Budget) => (selectedBudget.value = budget);

    onMounted(async () => {
      await getBudgets();
    });

    return { allBudgets, selectedBudget, selectToEdit };
  },
});
</script>

<style lang="scss" scoped>
.budgets {
  height: 100%;

  &__new-btn {
    margin: 12px;
  }

  &__main {
    display: flex;
    justify-content: space-between;
    height: 100%;
  }

  &__list {
    flex-grow: 1;
  }
}
</style>
