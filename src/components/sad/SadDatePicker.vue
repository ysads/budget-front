<template>
  <div class="sad-date-picker">
    <sad-label to="name" :text="label" data-test="label" />
    <el-date-picker
      class="sad-date-picker__input"
      :class="[errorClass]"
      type="date"
      :placeholder="placeholder"
      :format="format"
      :model-value="modelValue"
      :name="name"
      @update:model-value="(val) => $emit('update:model-value', val)"
      @blur="$emit('blur')"
    />
    <sad-tip
      v-if="tipText"
      class="sad-date-picker__tip"
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
import { ElDatePicker } from 'element-plus';

export default defineComponent({
  props: {
    error: {
      type: String,
      default: '',
    },
    format: {
      type: String,
      required: true,
    },
    label: {
      type: String,
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
    modelValue: {
      type: [String, Date],
      default: () => new Date(),
    },
  },

  emits: ['blur', 'update:model-value'],

  components: {
    ElDatePicker,
    SadLabel,
    SadTip,
  },

  setup(props) {
    const { errorClass, tipText, tipVariant } = useTip(props);

    return { errorClass, tipText, tipVariant };
  },
});
</script>

<style lang="scss" scoped>
.sad-date-picker {
  &__tip {
    margin-top: $base;
  }
}
</style>
