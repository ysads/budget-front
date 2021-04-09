<template>
  <div>
    <sad-label
      :to="name"
      :text="label"
      data-test="label"
    >
      <el-select
        class="sad-select"
        :class="[errorClass]"
        :value="value"
        :placeholder="placeholder"
        :disabled="disabled"
        :allow-create="allowCreate"
        default-first-option
        filterable
        data-test="select"
        @input="val => $emit('input', val)"
        @blur="$emit('blur')"
      >
        <div v-if="grouped">
          <el-option-group
            v-for="group in options"
            :key="group.label"
            :label="group.label"
            data-test="select-group"
          >
            <el-option
              v-for="option in group.options"
              :key="option.value"
              :label="option.label"
              :value="option.value"
              data-test="select-option"
            />
          </el-option-group>
        </div>
        <div v-else>
          <el-option
            v-for="option in options"
            :key="option.value"
            :label="option.label"
            :value="option.value"
            data-test="select-option"
          />
        </div>
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
    allowCreate: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: '',
    },
    grouped: {
      type: Boolean,
      default: false,
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
    const { errorClass, tipText, tipVariant } = useTip(props)

    return { errorClass, tipText, tipVariant }
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
