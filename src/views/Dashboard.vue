<template>
  <div class="dashboard">
    <i class="fas fa-bars dashboard__drawer-toggle" @click="toggleDrawer" />
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

<script>
import DashboardMenu from '@/components/DashboardMenu';
import Loading from '@/components/Loading';
import { getAccounts } from '@/repositories/accounts';
import { getCategoryGroups } from '@/repositories/category-groups';
import { getCategories } from '@/repositories/categories';
import { getMonthlyBudgets } from '@/repositories/monthly-budgets';
import { getPayees } from '@/repositories/payees';
import { getBudgetById, openBudget } from '@/repositories/budgets';
import { getMe } from '@/repositories/auth';
import { isoMonth } from '@/support/date';
import { defineComponent, ref } from 'vue';

const MD_BREAKPOINT = 768;

export default defineComponent({
  name: 'Dashboard',

  components: {
    DashboardMenu,
    Loading,
  },

  setup() {
    const isDrawerVisible = ref(false);
    const loading = ref(true);

    const toggleDrawer = () => (isDrawerVisible.value = !isDrawerVisible.value);

    return { isDrawerVisible, loading, openBudget, toggleDrawer };
  },

  data() {
    return {
      innerWidth: window.innerWidth,
    };
  },

  async mounted() {
    window.addEventListener('resize', this.onResize);
    await this.validateSession();
    await getBudgetById(this.$route.params.budgetId);

    const params = { budgetId: openBudget.value.id };

    await Promise.all([
      getAccounts(params),
      getCategoryGroups(params),
      getCategories(params),
      getPayees(params),
      // FIXME: account screens rely on that, maybe move it to a more specific view
      getMonthlyBudgets({ ...params, isoMonth: isoMonth(new Date()) }),
    ]);
    this.loading = false;
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.onResize);
  },

  computed: {
    showDrawer() {
      return this.isDrawerVisible && this.innerWidth <= MD_BREAKPOINT;
    },
  },

  methods: {
    async validateSession() {
      try {
        await getMe();
      } catch {
        this.$route.push({ name: 'SignIn' });
      }
    },

    onResize() {
      this.innerWidth = window.innerWidth;
    },
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
  position: fixed;
  width: 100%;
  padding-top: $base * 16;
}
</style>
