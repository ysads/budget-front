<template>
  <div
    class="sad-checkbox"
    data-test="sad-checkbox"
  >
    <div class="sad-checkbox__input-wrapper">
      <input
        :id="id"
        class="sad-checkbox__input"
        type="checkbox"
        :checked="value"
        :name="name"
        data-test="input"
        @input="e => $emit('input', e.target.checked)"
      >
      <label
        class="sad-checkbox__label"
        :for="id"
        data-test="label"
      >
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
<script>
import SadTip from './SadTip'
import useTip from '@/use/tip'
import uuid from 'uuid-random'

export default {
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
    value: {
      type: Boolean,
      default: false,
    },
    tip: {
      type: String,
      default: '',
    },
  },

  setup (props) {
    const { tipText, tipVariant } = useTip(props)

    return { tipText, tipVariant }
  },
}
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
      content: "";
    }

    &:focus + label::before,
    &:active + label::before {
      border-color: var(--input-focus);
      transition: 0.2s;
    }

    &:checked + label::before {
      background: var(--color-primary);
      border-color: var(--color-primary);
    }
  }

  &__label {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    height: 6*$base;
    justify-content: center;
    padding-left: 6*$base;

    &::before,
    &::after {
      content: "";
      display: inline-block;
      position: absolute;
    }

    &::before {
      background: var(--app-white);
      border: 2px solid var(--input-border);
      border-radius: 2px;
      height: 12px;
      left: 0;
      top: 4px;
      width: 12px;
    }

    &::after {
      border-bottom: 2px solid var(--app-white);
      border-left: 2px solid var(--app-white);
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
