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
      :disabled="isEdit"
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
      :money="moneySettings"
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
import { createMonthlyBudget, updateMonthlyBudget } from '@/repositories/monthly-budgets'
import { currencyToCents, currencySettings, fromCents } from '@/support/money'
import { currentMonth } from '@/repositories/months'
import { computed, reactive } from '@vue/composition-api'
import { useI18n } from '@/use/i18n'

export default {
  name: 'MonthlyBudgetDetails',

  props: {
    monthlyBudget: {
      type: Object,
      default: () => ({}),
    },
  },

  components: {
    SadButton,
    SadDrawer,
    SadInput,
    SadSelect,
  },

  setup ({ monthlyBudget }, { emit }) {
    const { st, t } = useI18n('MonthlyBudgetDetails')
    const form = reactive({
      id: monthlyBudget.id || '',
      categoryId: monthlyBudget.categoryId || '',
      budgeted: fromCents(monthlyBudget.budgeted) || 0,
    })
    const moneySettings = computed(
      () => currencySettings(openBudget.value),
    )
    const isEdit = computed(
      () => Boolean(form.id),
    )

    const categoriesGrouped = categoryGroups.value.map(group => ({
      label: group.name,
      options: categoriesByGroupId(group.id).map(c => ({
        value: c.id,
        label: c.name,
      })),
    }))

    const handleSubmit = async () => {
      const save = isEdit.value
        ? updateMonthlyBudget
        : createMonthlyBudget

      try {
        await save({
          ...form,
          budgeted: currencyToCents(form.budgeted, openBudget.value),
          budgetId: openBudget.value.id,
          monthId: currentMonth.value.id,
        })
        alert.success(
          isEdit.value ? st('updated') : st('created'),
        )
        emit('close')
      } catch (err) {
        handleApiError(err)
      }
    }

    return {
      categoriesGrouped,
      currentMonth,
      form,
      isEdit,
      handleSubmit,
      moneySettings,
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
