<template>
  <div class="sad-modal">
    <div
      class="sad-modal__overlay"
      data-test="overlay"
      @click="$emit('close')"
    />
    <section class="sad-modal__wrapper">
      <header class="sad-modal__header">
        <i class="fas fa-times" data-test="close-btn" @click="$emit('close')" />
        <h3 v-if="title" class="sad-modal__header-title" data-test="title">
          {{ title }}
        </h3>
      </header>
      <slot />
      <footer class="sad-modal__footer">
        <slot name="footer"></slot>
      </footer>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SadModal',

  props: {
    title: {
      type: String,
      default: '',
    },
  },

  emits: ['close'],
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

      @extend %h3;
    }

    i {
      color: var(--modal-close-btn);
      cursor: pointer;

      // &:active {
      //   @include scale-90;
      // }
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
</style>