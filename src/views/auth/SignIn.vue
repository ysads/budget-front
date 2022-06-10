<template>
  <div class="sign-in">
    <code v-if="isAuthenticated">{{ JSON.stringify(user) }}</code>
    <sad-button class="sign-in__control" @click="login">
      {{ t('SignIn.signIn') }}
    </sad-button>
    <code style="color: thistle; background: teal; font-weight: 700">{{
      authToken
    }}</code>
  </div>
</template>

<script lang="ts">
// import SadInput from '@/components/sad/SadInput.vue';
import SadButton from '@/components/sad/SadButton.vue';
import useI18n from '@/use/i18n';
// import { useRouter } from 'vue-router';
import { defineComponent } from 'vue';
import { authToken } from '@/repositories/auth';
import { useAuth0 } from '@auth0/auth0-vue';
import { updateAuthToken } from '@/repositories/auth';

export default defineComponent({
  name: 'SignIn',

  components: {
    SadButton,
  },

  setup() {
    const { loginWithPopup, user, isAuthenticated, getAccessTokenSilently } =
      useAuth0();
    const { t } = useI18n();

    const login = () => {
      loginWithPopup().then(async () => {
        const token = await getAccessTokenSilently();
        updateAuthToken(token);
      });
    };

    return { login, isAuthenticated, t, user, authToken };
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
