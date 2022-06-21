<template>
  <div class="auth">
    <main class="auth__main">
      <img class="auth__logo" src="@/assets/logo.png" />
      <h1 class="auth__title">{{ t('Auth.title') }}</h1>
      <loading v-if="isLoading" data-test="loading" />
      <sad-button v-else data-test="button" @click="login">
        <span>{{ t('Auth.signInWithAuth0') }}</span>
      </sad-button>
    </main>
  </div>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import Loading from '@/components/Loading.vue';
import SadButton from '@/components/sad/SadButton.vue';
import { getMe, updateAuthToken } from '@/repositories/auth';
import { useAuth0 } from '@auth0/auth0-vue';
import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import alert from '@/support/alert';

export default defineComponent({
  name: 'Auth',

  components: {
    Loading,
    SadButton,
  },

  setup() {
    const router = useRouter();
    const { t } = useI18n();
    const { loginWithPopup, isAuthenticated, getAccessTokenSilently } =
      useAuth0();
    const isLoading = ref(isAuthenticated.value);

    const getTokensAndGoToBudget = async () => {
      const token = await getAccessTokenSilently();

      updateAuthToken(token);
      const currentUser = await getMe();

      router.push({
        name: 'Budget',
        params: { budgetId: currentUser.defaultBudgetId },
      });
    };

    onMounted(() => {
      if (isAuthenticated.value) {
        getTokensAndGoToBudget();
      }
    });

    const login = async () => {
      isLoading.value = true;
      try {
        await loginWithPopup();
        await getTokensAndGoToBudget();
      } catch (err) {
        isLoading.value = false;
        alert.error(err as string);
      }
    };

    return { isLoading, login, t };
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
    height: 400px;
    margin: 0 auto;
    place-items: center;
    width: 75%;

    @include breakpoint(md) {
      width: 400px;
    }
  }
}
</style>
