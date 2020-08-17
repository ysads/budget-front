<template>
  <div class="dashboard">
    <drawer v-if="openBudget" class="dashboard__drawer" />
    <main class="dashboard__main">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Drawer from '@/components/Drawer'
import { createNamespacedHelpers } from 'vuex'
import { AUTH, BUDGETS } from '@/store/namespaces'

const authHelper = createNamespacedHelpers(AUTH)
const budgetsHelper = createNamespacedHelpers(BUDGETS)

export default {
  name: 'Dashboard',

  components: {
    Drawer,
  },

  async mounted () {
    await this.validateSession()
    await this.getBudget(this.$route.params.id)
  },

  computed: {
    ...budgetsHelper.mapState(['openBudget']),
  },

  methods: {
    ...authHelper.mapActions(['getMe']),
    ...budgetsHelper.mapActions(['getBudget']),

    async validateSession () {
      try {
        await this.getMe()
      } catch {
        this.$router.push({ name: 'SignIn' })
      }
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
  }

  &__main {
    width: 100%;

    @include breakpoint(md) {
      width: 80%;
    }
  }
}
</style>
