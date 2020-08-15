<template>
  <div class="sign-in">
    <el-input
      v-model="user.email"
      placeholder="Please input"
    />
    <el-input
      v-model="user.password"
      placeholder="Please input password"
      show-password
    />
    <el-button @click="handleSignIn">Sign In</el-button>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { AUTH } from '@/store/namespaces'

const authHelper = createNamespacedHelpers(AUTH)

export default {
  name: 'SignIn',

  data () {
    return {
      user: {
        email: '',
        password: '',
      },
    }
  },

  methods: {
    ...authHelper.mapActions(['signIn']),

    async handleSignIn () {
      await this.signIn(this.user)

      this.$router.push({ name: 'AllAccounts', params: { id: 1234 } })
    },
  },
}
</script>

<style lang="scss" scoped>
.sign-in {

}
</style>
