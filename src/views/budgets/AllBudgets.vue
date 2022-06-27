<template>
  <div class="wrapper">
    <aside>
      <ul>
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
            <sad-icon
              class="dashboard-popup__icon"
              name="folder"
              size="medium"
            />
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
    </aside>
    <main>
      <h1>all dashboards</h1>
      <div class="toolbar">
        <sad-button type="ghost">new dashboard</sad-button>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import SadButton from '@/components/sad/SadButton.vue';
import SadIcon from '@/components/sad/SadIcon.vue';
import { getBudgets, setOpenBudget } from '@/repositories/budgets';
import { Budget } from '@/types/models';
import { defineComponent, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: {
    SadButton,
    SadIcon,
  },
  setup() {
    const { t } = useI18n();
    const router = useRouter();

    const isLoading = ref<boolean>(false);
    const budgets = ref<Budget[]>([]);

    onMounted(() => {
      isLoading.value = true;

      getBudgets()
        .then((r) => (budgets.value = r))
        .finally(() => (isLoading.value = false));
    });

    const useBudget = (budget: Budget) => {
      setOpenBudget(budget);
      router.push({ name: 'Budget', params: { budgetId: budget.id } });
    };

    return { budgets, useBudget, isLoading, t };
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  display: flex;
  height: 100vh;
}
aside {
  width: 30%;
  height: 100%;
  border-right: 1px solid var(--budget-menu-separator);

  .dashboard-popup {
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
}
main {
  width: 70%;
  height: 100%;
}
</style>
