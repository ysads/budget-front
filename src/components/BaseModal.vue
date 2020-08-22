<template>
  <div class="base-modal">
    <div
      class="base-modal__overlay"
      data-test='overlay'
      @click="$emit('close')"
    />
    <section class="base-modal__wrapper">
      <header class="base-modal__header">
        <i
          class="fas fa-times"
          data-test="close-btn"
          @click="$emit('close')"
        />

        <h3
          v-if="title"
          class="base-modal__header-title"
          data-test="title"
        >
          {{ title }}
        </h3>
      </header>
      <slot></slot>
    </section>
  </div>
</template>

<script>
export default {
  name: 'BaseModal',

  props: {
    title: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.base-modal {
  &__overlay {
    cursor: pointer;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: var(--modal-overlay);
    overflow: hidden;
    z-index: 3;
  }

  &__wrapper {
    $modal-top: 100px;
    $modal-width: calc(100% - #{$base * 4 * 2});

    @include margin(left, 4);
    @include margin(right, 4);

    background: var(--modal-bg);
    border-radius: $radius-8;
    box-sizing: border-box;
    display: flex;
    flex-flow: column;
    left: 0;
    position: fixed;
    padding: $base * 6;
    top: $modal-top;
    transition: all 0.5s ease;
    width: $modal-width;
    z-index: 4;

    @include breakpoint(md) {
      width: 600px;
      left: calc(50% - 300px);
      padding: $base * 5;
    }
  }

  &__header {
    @include margin(bottom, 6);

    align-items: center;
    display: flex;
    flex-direction: row-reverse;
    font-size: 1.75rem;
    justify-content: space-between;

    &-title {
      @extend %h3;

      color: var(--modal-title);
    }

    i {
      color: var(--modal-close-btn);
      cursor: pointer;

      &:active {
        @include scale-85;
      }
    }
  }
  &__group {
    display: flex;
    justify-content: space-between;
  }
}
</style>
