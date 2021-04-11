<template>
  <div
    class="sad-date-picker"
  >
    <sad-label
      to="name"
      :text="label"
      data-test="label"
    >
      <el-date-picker
        class="sad-date-picker__input"
        :class="[errorClass]"
        type="date"
        :placeholder="placeholder"
        :format="format"
        :value="value"
        :name="name"
        value-format="yyyy-MM-dd"
        data-test="picker"
        @input="val => $emit('input', val)"
        @blur="$emit('blur')"
      />
    </sad-label>
    <sad-tip
      v-if="tipText"
      class="sad-date-picker__tip"
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
    value: {
      type: [String, Date],
      default: () => new Date(),
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
.sad-date-picker {
  &__input {
    width: 100%;
  }

  &__tip {
    margin-top: $base;
  }
}
</style>
