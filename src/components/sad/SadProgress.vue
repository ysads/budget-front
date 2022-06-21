<template>
  <div
    role="progressbar"
    class="sad-progress"
    :class="classes"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-valuenow="value"
  >
    <div
      :style="doneStyling"
      class="sad-progress__current"
      :data-current="value + '%'"
      data-test="elapsed"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';

export type ProgressColor = 'blue' | 'red' | 'green';
export type ProgressVariant = 'normal' | 'inverted';

export default defineComponent({
  props: {
    value: {
      type: Number,
      required: true,
    },
    color: {
      type: String as PropType<ProgressColor>,
      required: true,
    },
    variant: {
      type: String as PropType<ProgressVariant>,
      default: 'normal',
    },
  },
  setup(props) {
    const doneStyling = computed(() => {
      return {
        width: `${props.value}%`,
      };
    });
    const classes = computed(() => [
      `sad-progress--${props.color}`,
      `sad-progress--${props.variant}`,
    ]);

    return { classes, doneStyling };
  },
});
</script>

<style lang="scss" scoped>
.sad-progress {
  background: var(--progress-bg);
  border-radius: 4px;
  height: 5px;
  overflow: hidden;
  width: 100%;

  &__current {
    height: 100%;
  }

  &--blue > &__current {
    background: var(--progress-blue);
  }

  &--red > &__current {
    background: var(--progress-red);
  }

  &--green > &__current {
    background: var(--progress-green);
  }
}
</style>
