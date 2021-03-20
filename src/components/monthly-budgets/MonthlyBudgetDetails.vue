<template>
  <sad-drawer
    class="mb-details"
    :title="t('newMonthlyBudget')"
    data-test="drawer"
    @close="$emit('close')"
  >
    <sad-select
      v-model="form.categoryId"
      class="mb-details__control"
      :label="st('category')"
      :options="categoriesGrouped"
      :placeholder="st('categoryPlaceholder')"
      name="category"
      data-test="category"
      grouped
    />
    <sad-input
      v-model="form.budgeted"
      class="mb-details__control"
      :label="st('budgeted')"
      name="budgeted"
      data-test="budgeted"
    />
    <div slot="footer">
      <sad-button
        size="normal"
        type="primary"
        full-width
        data-test="save-btn"
        @click="handleSubmit"
      >
        {{ t('save') }}
      </sad-button>
    </div>
  </sad-drawer>
</template>

<script>
import SadButton from '@/components/sad/SadButton'
import SadDrawer from '@/components/sad/SadDrawer'
import SadInput from '@/components/sad/SadInput'
import SadSelect from '@/components/sad/SadSelect'
import alert from '@/support/alert'
import { handleApiError } from '@/api/errors'
import { openBudget } from '@/repositories/budgets'
import { categoriesByGroupId } from '@/repositories/categories'
import { categoryGroups } from '@/repositories/category-groups'
import { createMonthlyBudget } from '@/repositories/monthly-budgets'
import { currencyToCents } from '@/support/money'
import { currentMonth } from '@/repositories/months'
import { reactive } from '@vue/composition-api'
import { useI18n } from '@/use/i18n'

export default {
  name: 'MonthlyBudgetDetails',

  components: {
    SadButton,
    SadDrawer,
    SadInput,
    SadSelect,
  },

  setup (_, { emit }) {
    const { st, t } = useI18n('MonthlyBudgetDetails')
    const categoriesGrouped = categoryGroups.value.map(group => ({
      label: group.name,
      options: categoriesByGroupId(group.id).map(c => ({
        value: c.id,
        label: c.name,
      })),
    }))
    const form = reactive({
      categoryId: '',
      budgeted: 0,
    })

    const handleSubmit = async () => {
      try {
        await createMonthlyBudget({
          ...form,
          budgeted: currencyToCents(form.budgeted, openBudget.value),
          budgetId: openBudget.value.id,
          monthId: currentMonth.value.id,
        })
        alert.success(st('created'))
        emit('close')
      } catch (err) {
        handleApiError(err)
      }
    }

    return {
      categoriesGrouped,
      currentMonth,
      form,
      handleSubmit,
      openBudget,
      st,
      t,
    }
  },
}
</script>

<style lang="scss" scoped>
.mb-details {
  &__control {
    width: 100%;
  }

  &__control + &__control {
    margin-top: $base*4;
  }
}
</style>
