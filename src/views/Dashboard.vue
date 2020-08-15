<template>
  <div class="dashboard">
    <drawer v-if="openBoard" class="dashboard__drawer" />
    <main class="dashboard__main">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Drawer from '@/components/Drawer'
import { createNamespacedHelpers } from 'vuex'
import { AUTH, BUDGET_BOARDS } from '@/store/namespaces'

const authHelper = createNamespacedHelpers(AUTH)
const budgetBoardsHelper = createNamespacedHelpers(BUDGET_BOARDS)

export default {
  name: 'Dashboard',

  components: {
    Drawer,
  },

  async mounted () {
    await this.validateSession()
    console.log('about to bud')
    await this.getBudgetBoard(this.$route.params.id)
    console.log('passed to bud')
  },

  computed: {
    ...budgetBoardsHelper.mapState(['openBoard']),
  },

  methods: {
    ...authHelper.mapActions(['getMe']),
    ...budgetBoardsHelper.mapActions(['getBudgetBoard']),

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
