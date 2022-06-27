<template>
  <div class="spinner-wrapper">
    <div class="spinner" :class="classes">
      <div class="bounce bounce1"></div>
      <div class="bounce bounce2"></div>
      <div class="bounce bounce3"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    variant: {
      type: String as PropType<'normal' | 'inverted'>,
      default: 'normal',
    },
  },
  setup(props) {
    const classes = [`spinner--${props.variant}`];

    return { classes };
  },
});
</script>

<style scoped>
.spinner-wrapper {
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
}

.spinner {
  text-align: center;
  width: 70px;
}

.spinner > div {
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  border-radius: 100%;
  display: inline-block;
  height: 18px;
  width: 18px;
}

.spinner--normal .bounce {
  background-color: var(--loading-bg);
}

.spinner--inverted .bounce {
  background-color: white;
}

.spinner .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

@-webkit-keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
  }

  40% {
    -webkit-transform: scale(1);
  }
}

@keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }

  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>
