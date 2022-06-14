<template>
  <div class="sad-checkbox" data-test="sad-checkbox">
    <div class="sad-checkbox__input-wrapper">
      <input
        :id="id"
        class="sad-checkbox__input"
        type="checkbox"
        :checked="modelValue"
        :name="name"
        data-test="input"
        @input="(e) => $emit('update:modelValue', e.target.checked)"
      />
      <label class="sad-checkbox__label" :for="id" data-test="label">
        {{ label }}
      </label>
    </div>
    <sad-tip
      v-if="tipText"
      class="sad-checkbox__tip"
      :variant="tipVariant"
      :text="tipText"
      data-test="tip"
    />
  </div>
</template>

<script lang="ts">
import SadTip from './SadTip.vue';
import useTip from '@/use/tip';
import uuid from 'uuid-random';
import { defineComponent } from 'vue';

// @deprecated
export default defineComponent({
  name: 'SadCheckbox',

  components: {
    SadTip,
  },

  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    id: {
      type: [String, Number],
      default: () => uuid(),
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
    tip: {
      type: String,
      default: '',
    },
  },

  emits: ['update:model-value'],

  setup(props) {
    const { tipText, tipVariant } = useTip(props);

    return { tipText, tipVariant };
  },
});
</script>

<style lang="scss">
.sad-checkbox {
  $self: &;

  position: relative;

  &__input-wrapper {
    align-items: center;
    color: inherit;
    display: inline-flex;
    min-height: inherit;
    position: relative;
  }

  &__input {
    opacity: 0;
    position: absolute;

    + label::after {
      content: none;
    }

    &:checked + label::after {
      content: '';
    }

    &:focus + label::before,
    &:active + label::before {
      border-color: rgb(61 121 185);
      transition: 0.2s;
    }

    &:checked + label::before {
      background: var(--color-primary);
      border-color: var(--color-primary);
    }
  }

  &__label {
    color: var(--text-primary);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    height: 6 * $base;
    justify-content: center;
    padding-left: 6 * $base;

    &::before,
    &::after {
      content: '';
      display: inline-block;
      position: absolute;
    }

    &::before {
      background: var(--checkbox-bg);
      border: 2px solid var(--checkbox-border);
      border-radius: 2px;
      height: 12px;
      left: 0;
      top: 4px;
      width: 12px;
    }

    &::after {
      border-bottom: 2px solid var(--checbox-check);
      border-left: 2px solid var(--checbox-check);
      height: 4px;
      left: 3px;
      top: 8px;
      transform: rotate(-45deg);
      width: 8px;
    }
  }

  &__tip {
    margin-top: $base;
  }
}
</style>
