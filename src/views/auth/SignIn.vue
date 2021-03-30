<template>
  <div class="sign-in">
    <sad-input
      v-model="user.email"
      class="sign-in__control"
      name="email"
      :label="st('email')"
    />
    <sad-input
      v-model="user.password"
      class="sign-in__control"
      name="password"
      type="password"
      :label="st('password')"
    />
    <sad-button
      class="sign-in__control"
      @click="handleSignIn"
    >
      {{ st('signIn') }}
    </sad-button>
  </div>
</template>

<script>
import SadInput from '@/components/sad/SadInput'
import SadButton from '@/components/sad/SadButton'
import { reactive } from '@vue/composition-api'
import { signIn } from '@/repositories/auth'
import { useI18n } from '@/use/i18n'

export default {
  name: 'SignIn',

  components: {
    SadButton,
    SadInput,
  },

  setup () {
    const user = reactive({
      email: '',
      password: '',
    })
    const { st } = useI18n('SignIn')

    return { user, st }
  },

  methods: {
    async handleSignIn () {
      await signIn(this.user)

      this.$router.push({ name: 'AllAccounts', params: { id: 1234 } })
    },
  },
}
</script>

<style lang="scss" scoped>
.sign-in {
  padding: $base*8;

  &__control + &__control {
    @include margin(top, 4);
  }
}
</style>
