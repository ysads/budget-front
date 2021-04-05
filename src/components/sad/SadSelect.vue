<template>
  <div>
    <sad-label
      :to="name"
      :text="label"
      data-test="label"
    >
      <el-select
        class="sad-select"
        :value="value"
        :placeholder="placeholder"
        :disabled="disabled"
        data-test="select"
        @input="val => $emit('input', val)"
      >
        <el-option-group
          v-for="group in options"
          :key="group.label"
          :label="group.label"
        >
          <el-option
            v-for="option in group.options"
            :key="option.value"
            :label="option.label"
            :value="option.value"
            data-test="select-option"
          />
        </el-option-group>
      </el-select>
    </sad-label>
    <sad-tip
      v-if="tipText"
      class="sad-select__tip"
      :variant="tipVariant"
      :text="tipText"
      data-test="tip"
    />
  </div>
</template>

<script>
import SadLabel from './SadLabel'
import SadTip from './SadTip'
import useTip from '@/use/tip'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
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
    value: {
      type: [Number, String],
      required: true,
    },
  },

  components: {
    SadLabel,
    SadTip,
  },

  setup (props) {
    const { tipText, tipVariant } = useTip(props)
    return { tipText, tipVariant }
  },
})
</script>

<style lang="scss" scoped>
.sad-select {
  width: 100%;

  &__tip {
    margin-top: $base;
  }
}
</style>
