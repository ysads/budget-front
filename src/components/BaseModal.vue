<template>
  <div class="base-modal">
    <div
      class="base-modal__overlay"
      data-test='overlay'
      @click="$emit('close')"
    />
    <section class="base-modal__wrapper">
      <nav class="base-modal__close">
        <i
          class="fas fa-times"
          data-test="close-btn"
          @click="$emit('close')"
        />
      </nav>
      <slot></slot>
    </section>
  </div>
</template>

<script>
export default {
  name: 'BaseModal',
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

    border-radius: $radius-8;
    background: var(--modal-bg);
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

  &__close {
    @include margin(bottom, 2);

    color: var(--modal-close-btn);
    display: flex;
    flex-direction: row-reverse;
    font-size: 1.75rem;

    i {
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
