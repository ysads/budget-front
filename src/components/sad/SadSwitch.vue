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
  background: var(--color-info);
  border-color: var(--color-info);
}

.el-switch__label.is-active {
  color: var(--color-primary);
}

.el-switch.is-checked .el-switch__core {
  background: var(--color-primary);
  border-color: var(--color-primary);
}
</style>
