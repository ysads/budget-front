<template>
  <focus-trap :active="show">
    <div class="sad-drawer">
      <transition name="fade">
        <div
          v-if="show"
          class="sad-drawer__overlay"
          data-test="overlay"
          @click="$emit('close')"
        />
      </transition>
      <transition name="slide-right">
        <section v-if="show" class="sad-drawer__wrapper" role="dialog">
          <header class="sad-drawer__header">
            <sad-button
              class="sad-drawer__header-close"
              type="ghost"
              size="small"
              :aria-label="t('general.closeRegion', { title })"
              data-test="close-btn"
              @click="$emit('close')"
            >
              <sad-icon name="times" size="medium" />
            </sad-button>
            <h3 v-if="title" class="sad-drawer__header-title" data-test="title">
              {{ title }}
            </h3>
          </header>
          <div class="sad-drawer__content">
            <slot />
          </div>
          <footer class="sad-drawer__footer">
            <slot name="footer" />
          </footer>
        </section>
      </transition>
    </div>
  </focus-trap>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { eventBus, Events } from '@/events';
import { FocusTrap } from 'focus-trap-vue';
import SadButton from './SadButton.vue';
import SadIcon from './SadIcon.vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'SadDrawer',
  components: {
    FocusTrap,
    SadButton,
    SadIcon,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    show: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['close'],

  setup(props, { emit }) {
    const { t } = useI18n();

    eventBus.on(Events.CLOSE_DRAWER, () => {
      if (props.show) {
        emit('close');
      }
    });

    return { t };
  },
});
</script>

<style lang="scss" scoped>
.sad-drawer {
  $padding: $base * 6;

  &__overlay {
    background: var(--modal-overlay);
    bottom: 0;
    cursor: pointer;
    height: 100%;
    left: 0;
    overflow: hidden;
    position: fixed;
    right: 0;
    top: 0;
    width: 100%;
    z-index: 3;
  }

  &__wrapper {
    background: var(--drawer-bg);
    box-sizing: border-box;
    display: flex;
    flex-flow: column;
    height: 100vh;
    overflow: auto;
    padding: $padding;
    position: fixed;
    right: 0;
    top: 0;
    transition: all 0.5s ease;
    width: 100%;
    z-index: 4;

    @include breakpoint(md) {
      width: 400px;
    }
  }

  &__header {
    align-items: center;
    display: flex;
    flex-direction: row-reverse;
    font-size: 1.75rem;
    justify-content: space-between;
    margin-bottom: $base * 6;

    &-title {
      color: var(--modal-title);
      font-size: var(--font-title2);
      font-weight: 600;
    }

    &-close {
      margin-right: -12px;
    }
  }

  &__content {
    flex-grow: 1;
  }

  &__footer {
    margin-top: $base * 4;
    width: 100%;
  }

  &__group {
    display: flex;
    justify-content: space-between;
  }
}

.fade-enter-active,
.fade-leave-active {
  opacity: 1;
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: all cubic-bezier(0, 1, 0.41, 0.99) 0.3s;
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);

  @include breakpoint(md) {
    transform: translateX(400px);
  }
}
</style>
