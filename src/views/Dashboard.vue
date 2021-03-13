<template>
  <div class="dashboard">
    <i
      class="fas fa-bars dashboard__drawer-toggle"
      @click="toggleDrawer"
    />
    <drawer
      v-if="openBudget"
      ref="drawer"
      class="dashboard__drawer"
      :class="{ 'fullscreen': showDrawer }"
    />
    <main class="dashboard__main">
      <loading v-if="!openBudget" />
      <router-view v-else />
    </main>
  </div>
</template>

<script>
import Drawer from '@/components/Drawer'
import Loading from '@/components/Loading'
import { getCategoryGroups } from '@/repositories/category-groups'
import { getCategories } from '@/repositories/categories'
import { getBudgetById } from '@/repositories/budgets'
import { createNamespacedHelpers } from 'vuex'
import { AUTH, BUDGETS } from '@/store/namespaces'

const authHelper = createNamespacedHelpers(AUTH)
const budgetsHelper = createNamespacedHelpers(BUDGETS)

const MD_BREAKPOINT = 768

export default {
  name: 'Dashboard',

  components: {
    Drawer,
    Loading,
  },

  data () {
    return {
      isDrawerVisible: false,
      innerWidth: window.innerWidth,
    }
  },

  async mounted () {
    window.addEventListener('resize', this.onResize)
    await this.validateSession()
    await this.getBudget(this.$route.params.budgetId)
    await getBudgetById(this.$route.params.budgetId)

    await Promise.all([
      getCategoryGroups({ budgetId: this.openBudget.id }),
      getCategories({ budgetId: this.openBudget.id }),
    ])
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.onResize)
  },

  computed: {
    ...budgetsHelper.mapState(['openBudget']),

    showDrawer () {
      return this.isDrawerVisible && this.innerWidth <= MD_BREAKPOINT
    },
  },

  methods: {
    ...authHelper.mapActions(['getMe']),
    ...budgetsHelper.mapActions(['getBudget']),

    async validateSession () {
      try {
        await this.getMe()
      } catch {
        this.$route.push({ name: 'SignIn' })
      }
    },

    toggleDrawer () {
      this.isDrawerVisible = !this.isDrawerVisible
    },

    onResize () {
      this.innerWidth = window.innerWidth
    },
  },
}
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
      width: 20%;
    }

    &-toggle {
      cursor: pointer;
      display: block;
      font-size: 20px;
      left: 20px;
      opacity: 0.5;
      position: absolute;
      top: 16px;
      z-index: 2;

      @include breakpoint(md) {
        display: none;
      }
    }
  }

  &__main {
    width: 100%;
    height: 100%;
    overflow: auto;

    @include breakpoint(md) {
      width: 80%;
    }
  }
}

.fullscreen {
  display: block;
  height: 100%;
  position: fixed;
  width: 100%;

  @include padding(top, 13);
}
</style>
