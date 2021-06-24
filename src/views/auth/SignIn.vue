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
    <sad-button class="sign-in__control" @click="handleSignIn">
      {{ st('signIn') }}
    </sad-button>
  </div>
</template>

<script lang="ts">
import SadInput from '@/components/sad/SadInput.vue';
import SadButton from '@/components/sad/SadButton.vue';
import useI18n from '@/use/i18n';
import { useRouter } from 'vue-router';
import { defineComponent, reactive } from 'vue';
import { getMe, signIn } from '@/repositories/auth';

export default defineComponent({
  name: 'SignIn',

  components: {
    SadButton,
    SadInput,
  },

  setup() {
    const user = reactive({
      email: '',
      password: '',
    });
    const { st } = useI18n('SignIn');

    const router = useRouter();
    const handleSignIn = async () => {
      await signIn(user);
      const currentUser = await getMe();
      router.push({
        name: 'Budget',
        params: { budgetId: currentUser.defaultBudgetId },
      });
    };

    return { handleSignIn, st, user };
  },
});
</script>

<style lang="scss" scoped>
.sign-in {
  padding: $base * 8;

  &__control + &__control {
    margin-top: $base * 4;
  }
}
</style>
