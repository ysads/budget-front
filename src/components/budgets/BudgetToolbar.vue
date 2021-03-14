<template>
  <div class="budget-toolbar">
    <div>
      <sad-button
        class="budget-toolbar__button"
        icon="plus"
        type="ghost"
        size="small"
        data-test="new-group-btn"
        @click="toggle('categoryGroupModal')"
      >
        {{ t('newCategoryGroup') }}
      </sad-button>

      <sad-button
        class="budget-toolbar__button"
        icon="plus"
        type="ghost"
        size="small"
        data-test="new-category-btn"
        @click="toggle('categoryModal')"
      >
        {{ t('newCategory') }}
      </sad-button>

      <sad-button
        class="budget-toolbar__button"
        icon="plus"
        type="ghost"
        size="small"
        data-test="new-monthly-budget-btn"
        @click="toggle('drawer')"
      >
        {{ t('newMonthlyBudget') }}
      </sad-button>

      <create-category-group-modal
        v-if="isVisible.categoryGroupModal"
        :budget="openBudget"
        data-test="new-group-modal"
        @close="toggle('categoryGroupModal')"
      />
      <create-category-modal
        v-if="isVisible.categoryModal"
        :budget="openBudget"
        data-test="new-category-modal"
        @close="toggle('categoryModal')"
      />
      <monthly-budget-details
        v-if="isVisible.drawer"
        data-test="monthly-budget-details"
        @close="toggle('drawer')"
      />
    </div>
  </div>
</template>

<script>
import CreateCategoryGroupModal from '@/components/category-groups/CreateCategoryGroupModal'
import CreateCategoryModal from '@/components/categories/CreateCategoryModal'
import MonthlyBudgetDetails from '@/components/monthly-budgets/MonthlyBudgetDetails'
import SadButton from '@/components/sad/SadButton'
import { useI18n } from '@/use/i18n'
import { openBudget } from '@/repositories/budgets'
import { reactive } from '@vue/composition-api'

export default {
  components: {
    CreateCategoryModal,
    CreateCategoryGroupModal,
    MonthlyBudgetDetails,
    SadButton,
  },

  setup () {
    const { t } = useI18n()
    const isVisible = reactive({
      categoryGroupModal: false,
      categoryModal: false,
      drawer: false,
    })
    const toggle = (prop) => {
      isVisible[prop] = !isVisible[prop]
    }

    return { isVisible, openBudget, toggle, t }
  },
}
</script>

<style lang="scss" scoped>
.budget-toolbar {
  border-bottom: 1px solid var(--acc-toolbar-border);
  display: flex;
  justify-content: space-between;
  padding: $base*2 $base*4;
}
</style>
