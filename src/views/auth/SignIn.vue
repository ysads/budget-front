<template>
  <div class="sign-in">
    <sad-button class="sign-in__control" @click="login">
      {{ t('SignIn.signIn') }}
    </sad-button>
  </div>
</template>

<script lang="ts">
import SadButton from '@/components/sad/SadButton.vue';
import useI18n from '@/use/i18n';
import { useRouter } from 'vue-router';
import { defineComponent } from 'vue';
import { getMe, updateAuthToken } from '@/repositories/auth';
import { useAuth0 } from '@auth0/auth0-vue';

export default defineComponent({
  name: 'SignIn',

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
