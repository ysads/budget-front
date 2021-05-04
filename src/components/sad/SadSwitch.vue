<template>
  <el-switch
    :value="value"
    :active-text="activeLabel"
    :inactive-text="inactiveLabel"
    @input="val => $emit('input', val)"
  />
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    activeLabel: {
      type: String,
      required: true,
    },
    inactiveLabel: {
      type: String,
      default: '',
    },
    value: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style lang="scss">
.el-switch__core {
  background: var(--color-success);
  border-color: var(--color-success);
}

.el-switch__label {
  color: var(--text-default);
}

.el-switch__label--right.is-active {
  color: var(--color-error);
}

.el-switch__label--left.is-active {
  color: var(--color-success);
}

.el-switch.is-checked .el-switch__core {
  background: var(--color-error);
  border-color: var(--color-error);
}
</style>
