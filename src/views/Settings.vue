<template>
  <div class="dashboard">
    <i class="fas fa-bars dashboard__drawer-toggle" @click="toggleMenu" />
    <settings-drawer
      class="dashboard__drawer"
      :class="{ fullscreen: showDrawer }"
    />
    <main class="dashboard__main">
      <loading v-if="loading" />
      <router-view v-else />
    </main>
  </div>
</template>

<script lang="ts">
import Loading from '@/components/Loading.vue';
import useWindowSize from '@/use/window-size';
import useToggle from '@/use/toggle';
import { getMe } from '@/repositories/auth';
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SettingsDrawer from '@/components/settings/SettingsDrawer.vue';

export default defineComponent({
  name: 'Dashboard',

  components: {
    Loading,
    SettingsDrawer,
  },

  setup() {
    const [isDrawerVisible, toggleMenu] = useToggle(false);
    const loading = ref(false);

    const router = useRouter();
    const route = useRoute();

    // INFO: validates if there is a user session active; otherwise, redirects to login page
    const validateSession = async () => {
      try {
        await getMe();
      } catch {
        router.push({ name: 'Auth' });
      }
    };

    const { isMobile } = useWindowSize();
    const showDrawer = computed(() => isDrawerVisible.value && isMobile.value);

    onMounted(async () => {
      await validateSession();
    });

    return {
      loading,
      route,
      showDrawer,
      toggleMenu,
    };
  },
});
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
      width: 30%;
    }

    @include breakpoint(lg) {
      width: 25%;
    }

    @include breakpoint(xl) {
      width: 20%;
    }

    &-toggle {
      cursor: pointer;
      display: block;
      font-size: 20px;
      left: 20px;
      opacity: 0.5;
      position: absolute;
      top: 32px;
      z-index: 2;

      @include breakpoint(md) {
        display: none;
      }
    }
  }

  &__main {
    background: var(--app-bg);
    height: 100%;
    overflow: auto;
    width: 100%;

    @include breakpoint(md) {
      width: 70%;
    }

    @include breakpoint(lg) {
      width: 75%;
    }

    @include breakpoint(xl) {
      width: 80%;
    }
  }
}

.fullscreen {
  display: block;
  height: 100%;
  padding-top: $base * 16;
  position: fixed;
  width: 100%;
}
</style>
