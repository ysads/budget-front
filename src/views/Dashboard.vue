<template>
  <div class="dashboard">
    <i class="fas fa-bars dashboard__drawer-toggle" @click="toggleMenu" />
    <dashboard-menu
      v-if="openBudget.id"
      ref="drawer"
      class="dashboard__drawer"
      :class="{ fullscreen: showDrawer }"
    />
    <main class="dashboard__main">
      <loading v-if="loading" />
      <router-view v-else />
    </main>
  </div>
</template>

<script lang="ts">
import DashboardMenu from '@/components/DashboardMenu.vue';
import Loading from '@/components/Loading.vue';
import useWindowSize from '@/use/window-size';
import useToggle from '@/use/toggle';
import { getAccounts } from '@/repositories/accounts';
import { getCategories } from '@/repositories/categories';
import { getMonthlyBudgets } from '@/repositories/monthly-budgets';
import { getPayees } from '@/repositories/payees';
import { getBudgetById, openBudget } from '@/repositories/budgets';
import { getMe } from '@/repositories/auth';
import { isoMonth } from '@/support/date';
import { computed, defineComponent, onMounted, onUnmounted, ref } from 'vue';
import { Events, eventBus } from '@/events';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  name: 'Dashboard',

  components: {
    DashboardMenu,
    Loading,
  },

  setup() {
    const [isDrawerVisible, toggleMenu] = useToggle(false);
    const loading = ref(true);

    const router = useRouter();
    const route = useRoute();

    // INFO: fetch all resources needed application-wise; note they might be used deep
    // below on components tree.
    const fetchResources = async () => {
      await getBudgetById(route.params.budgetId as string);

      const params = { budgetId: openBudget.value.id };

      await Promise.all([
        getAccounts(params),
        getCategories(params),
        getPayees(params),
        // FIXME: account screens rely on that, maybe move it to a more specific view
        getMonthlyBudgets({ ...params, isoMonth: isoMonth(new Date()) }),
      ]);
    };

    // INFO: validates if there is a user session active; otherwise, redirects to login page
    const validateSession = async () => {
      try {
        await getMe();
      } catch {
        router.push({ name: 'Auth' });
      }
    };

    const { isMobile } = useWindowSize();
    const showDrawer = computed(() => isDrawerVisible.value && isMobile.value);

    onMounted(async () => {
      await validateSession();

      eventBus.on(Events.CLOSE_DASHBOARD_MENU, toggleMenu);

      await fetchResources();
      loading.value = false;
    });

    onUnmounted(() => {
      eventBus.off(Events.CLOSE_DASHBOARD_MENU, toggleMenu);
    });

    return { isDrawerVisible, loading, openBudget, showDrawer, toggleMenu };
  },
});
</script>

<style lang="scss" scoped>
.dashboard {
  display: flex;
  flex-flow: row;
  height: 100vh;

  &__drawer {
    display: none;

    @include breakpoint(md) {
      display: block;
      height: 100%;
      width: 30%;
    }

    @include breakpoint(lg) {
      width: 25%;
    }

    @include breakpoint(xl) {
      width: 20%;
    }

    &-toggle {
      cursor: pointer;
      display: block;
      font-size: 20px;
      left: 20px;
      opacity: 0.5;
      position: absolute;
      top: 32px;
      z-index: 2;

      @include breakpoint(md) {
        display: none;
      }
    }
  }

  &__main {
    background: var(--app-bg);
    height: 100%;
    overflow: auto;
    width: 100%;

    @include breakpoint(md) {
      width: 70%;
    }

    @include breakpoint(lg) {
      width: 75%;
    }

    @include breakpoint(xl) {
      width: 80%;
    }
  }
}

.fullscreen {
  display: block;
  height: 100%;
  padding-top: $base * 16;
  position: fixed;
  width: 100%;
}
</style>
