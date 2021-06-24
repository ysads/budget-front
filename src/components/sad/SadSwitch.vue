<template>
  <el-switch
    :model-value="modelValue"
    :active-text="activeLabel"
    :inactive-text="inactiveLabel"
    @update:model-value="(val) => $emit('update:model-value', val)"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ElSwitch } from 'element-plus';

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
    modelValue: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['update:model-value'],

  components: {
    ElSwitch,
  },
});
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
