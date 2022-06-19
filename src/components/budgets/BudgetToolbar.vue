<template>
  <div class="budget-toolbar">
    <sad-button
      class="budget-toolbar__button"
      icon="plus"
      type="ghost"
      size="small"
      data-test="new-group-btn"
      @click="toggle('categoryGroupModal')"
    >
      {{ t('BudgetToolbar.newCategoryGroup') }}
    </sad-button>

    <sad-button
      class="budget-toolbar__button"
      icon="plus"
      type="ghost"
      size="small"
      data-test="new-category-btn"
      @click="toggle('categoryModal')"
    >
      {{ t('BudgetToolbar.newCategory') }}
    </sad-button>

    <sad-button
      class="budget-toolbar__button"
      icon="plus"
      type="ghost"
      size="small"
      data-test="new-monthly-budget-btn"
      @click="toggle('drawer')"
    >
      {{ t('BudgetToolbar.newMonthlyBudget') }}
    </sad-button>

    <create-category-group-modal
      :show="isVisible.categoryGroupModal"
      :budget="openBudget"
      data-test="new-group-modal"
      @close="toggle('categoryGroupModal')"
    />
    <create-category-modal
      :show="isVisible.categoryModal"
      :budget="openBudget"
      data-test="new-category-modal"
      @close="toggle('categoryModal')"
    />
    <monthly-budget-details
      :show="isVisible.drawer"
      data-test="monthly-budget-details"
      @close="toggle('drawer')"
    />
  </div>
</template>

<script lang="ts">
import CreateCategoryGroupModal from '@/components/category-groups/CreateCategoryGroupModal.vue';
import CreateCategoryModal from '@/components/categories/CreateCategoryModal.vue';
import MonthlyBudgetDetails from '@/components/monthly-budgets/MonthlyBudgetDetails.vue';
import SadButton from '@/components/sad/SadButton.vue';
import { useI18n } from 'vue-i18n';
import { openBudget } from '@/repositories/budgets';
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  components: {
    CreateCategoryModal,
    CreateCategoryGroupModal,
    MonthlyBudgetDetails,
    SadButton,
  },

  setup() {
    const { t } = useI18n();
    const isVisible = reactive({
      categoryGroupModal: false,
      categoryModal: false,
      drawer: false,
    });
    const toggle = (prop: keyof typeof isVisible) => {
      isVisible[prop] = !isVisible[prop];
    };

    return { isVisible, openBudget, toggle, t };
  },
});
</script>

<style lang="scss" scoped>
.budget-toolbar {
  display: flex;
  flex-flow: row wrap;
  gap: 12px;
  justify-content: flex-start;
  padding: $base * 2 $base * 4;
}
</style>
