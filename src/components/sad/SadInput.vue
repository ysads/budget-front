<template>
  <div>
    <sad-label to="name" :text="label" data-test="label" />
    <input
      :id="name"
      v-bind="$attrs"
      :value="modelValue"
      class="sad-input"
      :class="[errorClass]"
      data-test="input"
      :placeholder="placeholder"
      :type="type"
      @input="(e) => $emit('update:model-value', e.target.value)"
    />
    <sad-tip
      v-if="tipText"
      class="sad-input__tip"
      :variant="tipVariant"
      :text="tipText"
      data-test="tip"
    />
  </div>
</template>

<script lang="ts">
import SadLabel from './SadLabel.vue';
import SadTip from './SadTip.vue';
import useTip from '@/use/tip';

export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    error: {
      type: String,
      default: '',
    },
    modelValue: {
      type: [String, Number],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    tip: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
  },

  emits: ['update:model-value'],

  setup(props: any) {
    const { errorClass, tipText, tipVariant } = useTip(props);

    return { errorClass, tipText, tipVariant };
  },

  components: {
    SadLabel,
    SadTip,
  },
};
</script>

<style lang="scss" scoped>
.sad-input {
  border: 1px solid var(--input-border);
  border-radius: $radius-4;
  color: var(--text-default);
  height: $base * 10;
  padding: $base * 2;
  width: 100%;

  @extend %body-1;

  &:focus,
  &:active {
    border-color: var(--input-focus);
    transition: 0.2s;
  }

  &__tip {
    margin-top: $base;
  }

  &.error {
    border: 1px solid var(--color-error);
  }
}
</style>
