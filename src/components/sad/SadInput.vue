<template>
  <div class="sad-input">
    <sad-label :to="name" :text="label" data-test="label" />
    <div class="sad-input__wrapper">
      <div v-if="prefix" class="sad-input__prefix" data-test="prefix">
        {{ prefix }}
      </div>
      <input
        v-bind="$attrs"
        :id="name"
        :value="modelValue"
        class="sad-input__control"
        :class="[errorClass]"
        data-test="input"
        :placeholder="placeholder"
        :type="type"
        @input="(e) => $emit('update:model-value', e.target.value)"
      />
    </div>
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
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    error: {
      type: String,
      default: '',
    },
    label: {
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
    prefix: {
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

  setup(props) {
    const { errorClass, tipText, tipVariant } = useTip(props);

    return { errorClass, tipText, tipVariant };
  },

  components: {
    SadLabel,
    SadTip,
  },
});
</script>

<style lang="scss" scoped>
.sad-input {
  &__prefix {
    color: var(--input-text);
    margin-right: $base * 2;
  }

  &__wrapper {
    align-items: center;
    border: 1px solid var(--input-border);
    border-radius: $radius-4;
    display: flex;
    height: $base * 10;
    padding: $base * 2;
    width: 100%;

    &:focus-within {
      border-color: var(--input-focus);
      transition: 0.2s;
    }
  }

  &__control {
    color: var(--input-text);
    flex-grow: 1;
  }

  &__tip {
    margin-top: $base;
  }

  &.error {
    border: 1px solid var(--color-error);
  }
}
</style>
