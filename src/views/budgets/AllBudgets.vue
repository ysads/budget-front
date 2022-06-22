<template>
  <div class="auth">
    <main class="auth__main">
      <header class="auth__title">
        <h1>{{ t('AllBudgets.title') }}</h1>

        <sad-button data-test="button">
          <span>{{ t('AllBudgets.addNew') }}</span>
        </sad-button>
      </header>
      <loading v-if="isLoading" data-test="loading" />
      <ul v-else class="all-budgets__list">
        <li v-for="b in budgets" :key="b.id" class="all-budgets__list-item">
          <div class="all-budgets__info">
            <p class="all-budgets__info-name">{{ b.name }}</p>
            {{ b.currency }}
          </div>
          <div class="all-budgets__actions">
            <sad-button type="danger">
              <sad-icon class="all-budgets__actions-icon" name="trash-can" />{{
                t('AllBudgets.delete')
              }}
            </sad-button>
            <sad-button type="ghost">
              <sad-icon class="all-budgets__actions-icon" name="pen" />{{
                t('AllBudgets.edit')
              }}
            </sad-button>
            <sad-button type="ghost" @click="useBudget(b)">
              {{ t('AllBudgets.use') }}
              <sad-icon class="all-budgets__actions-icon" name="caret-right" />
            </sad-button>
          </div>
        </li>
      </ul>
    </main>
  </div>
  <!-- <h1>{{ t('AllBudgets.title') }}</h1>
  <loading v-if="isLoading" />
  <div v-else>
    <div v-for="budget in budgets" :key="budget.id">
      {{ budget.name }}
      {{ budget.currency }}
    </div>
  </div> -->
</template>

<script lang="ts">
import Loading from '@/components/Loading.vue';
import SadButton from '@/components/sad/SadButton.vue';
import SadIcon from '@/components/sad/SadIcon.vue';
import { getBudgets, setOpenBudget } from '@/repositories/budgets';
import { Budget } from '@/types/models';
import { defineComponent, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: {
    Loading,
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
.auth {
  background: var(--auth-bg);
  display: grid;
  height: 100vh;
  place-items: center;
  width: 100%;

  &__logo {
    width: 128px;
  }

  &__title {
    color: var(--text-primary);
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 56px;

    h1 {
      font-size: var(--font-title1);
      font-weight: 600;
    }
  }

  &__main {
    background: var(--auth-panel-bg);
    border-radius: var(--auth-panel-radius);
    box-shadow: var(--auth-shadow);
    display: grid;
    margin: 0 auto;
    place-items: center;
    width: 75%;
    padding: 24px;

    @include breakpoint(md) {
      max-width: 750px;
    }
  }
}
.all-budgets {
  &__info {
    flex-grow: 1;

    &-name {
      font-size: var(--font-body2);
      font-weight: 600;
    }
  }

  &__actions {
    display: flex;
    gap: 8px;

    &-icon {
      margin-right: 8px;
    }
  }

  &__list {
    width: 100%;

    &-item {
      align-items: center;
      display: flex;
      flex-flow: column;
      width: 100%;

      @include breakpoint(md) {
        justify-content: space-between;
        flex-flow: row;
      }
    }
    &-item + &-item {
      margin-top: 24px;
    }
  }
}
</style>
