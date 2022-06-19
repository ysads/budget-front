<template>
  <focus-trap :active="show">
    <div class="sad-modal">
      <transition name="fade">
        <div
          v-if="show"
          class="sad-modal__overlay"
          data-test="overlay"
          @click="$emit('close')"
        />
      </transition>
      <transition name="fade-up">
        <section v-if="show" class="sad-modal__wrapper" role="dialog">
          <header class="sad-modal__header">
            <sad-button
              type="ghost"
              size="small"
              :aria-label="t('general.closeRegion', { title })"
              data-test="close-btn"
              @click="$emit('close')"
            >
              <sad-icon name="times" size="medium" />
            </sad-button>
            <h3 v-if="title" class="sad-modal__header-title" data-test="title">
              {{ title }}
            </h3>
          </header>
          <slot />
          <footer class="sad-modal__footer">
            <slot name="footer"></slot>
          </footer>
        </section>
      </transition>
    </div>
  </focus-trap>
</template>

<script lang="ts">
import { eventBus, Events } from '@/events';
import { defineComponent } from 'vue';
import { FocusTrap } from 'focus-trap-vue';
import SadButton from '@/components/sad/SadButton.vue';
import SadIcon from '@/components/sad/SadIcon.vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'SadModal',

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

  components: {
    FocusTrap,
    SadButton,
    SadIcon,
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
.sad-modal {
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
    $modal-top: 100px;
    $modal-width: calc(100% - #{$base * 4 * 2});

    background: var(--modal-bg);
    border-radius: $radius-8;
    box-sizing: border-box;
    display: flex;
    flex-flow: column;
    left: 0;
    margin-left: $base * 4;
    margin-right: $base * 4;
    padding: $base * 6;
    position: fixed;
    top: $modal-top;
    transition: all 0.5s ease;
    width: $modal-width;
    z-index: 4;

    @include breakpoint(md) {
      left: calc(50% - 300px);
      padding: $base * 5;
      width: 600px;
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
  }

  &__footer {
    margin-top: $base * 4;
  }

  &__group {
    display: flex;
    justify-content: space-between;
  }
}

.fade-enter-active,
.fade-leave-active {
  opacity: 1;
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-up-enter-active,
.fade-up-leave-active {
  opacity: 1;
  transition: all cubic-bezier(0.17, 0.67, 0.23, 2.05) 0.3s;
}

.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
