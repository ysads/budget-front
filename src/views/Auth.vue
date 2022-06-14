<template>
  <div class="auth">
    <main class="auth__main">
      <img class="auth__logo" src="@/assets/logo.png" />
      <h1 class="auth__title">{{ t('Auth.title') }}</h1>
      <sad-button @click="login">
        {{ t('Auth.signInWithAuth0') }}
      </sad-button>
    </main>
  </div>
</template>

<script lang="ts">
import useI18n from '@/use/i18n';
import SadButton from '@/components/sad/SadButton.vue';
import { getMe, updateAuthToken } from '@/repositories/auth';
import { useAuth0 } from '@auth0/auth0-vue';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Auth',

  components: {
    SadButton,
  },

  setup() {
    const router = useRouter();
    const { t } = useI18n();
    const { loginWithPopup, getAccessTokenSilently } = useAuth0();

    const login = async () => {
      await loginWithPopup();
      const token = await getAccessTokenSilently();

      updateAuthToken(token);
      const currentUser = await getMe();

      router.push({
        name: 'Budget',
        params: { budgetId: currentUser.defaultBudgetId },
      });
    };

    return { login, t };
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
    font-size: var(--font-title1);
    font-weight: 600;
  }

  &__main {
    background: var(--auth-panel-bg);
    border-radius: var(--auth-panel-radius);
    box-shadow: var(--auth-shadow);
    display: grid;
    margin: 0 auto;
    place-items: center;
    width: 75%;
    height: 400px;

    @include breakpoint(md) {
      width: 400px;
    }
  }
}
</style>
