<template>
  <div>
    <sad-label to="name" :text="label" data-test="label" />
    <input
      :id="name"
      v-model="val"
      :class="classes"
      data-test="input"
      :placeholder="placeholder"
      :type="type"
      @input="updateValue"
      @focus="cleanFormat"
      @blur="formatValue"
    />
    <sad-tip
      v-if="tipText"
      class="sad-input__tip"
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
import { VMoney } from 'v-money'
import { computed } from '@vue/composition-api'

export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    error: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number],
      required: true,
    },
    money: {
      type: Object,
      required: false,
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
    type: {
      type: String,
      default: 'text',
    },
  },

  data () {
    return {
      val: this.value,
    }
  },

  setup (props) {
    const { tipText, tipVariant } = useTip(props)
    const classes = computed(() => {
      return {
        'sad-input': true,
        'sad-input--error': props.error,
      }
    })

    return { classes, tipText, tipVariant }
  },

  components: {
    SadLabel,
    SadTip,
  },

  directives: {
    money: VMoney,
  },

  computed: {
    formattedValue () {
      if (!this.val) {
        return ''
      }
      return `${this.money.prefix}${this.value}`
    },
  },

  methods: {
    updateValue (event) {
      this.$emit('input', event.target.value)
    },

    cleanFormat () {
      if (this.money) {
        this.val = this.value
      }
      this.$emit('focus')
    },

    formatValue () {
      if (this.money) {
        this.val = this.formattedValue
      }
      this.$emit('blur')
    },
  },

  watch: {
    value (newValue) {
      this.val = newValue
    },
  },
}
</script>

<style lang="scss" scoped>
.sad-input {
  border: 1px solid var(--input-border);
  border-radius: $radius-4;
  color: var(--text-default);
  height: $base * 10;
  padding: $base * 2;
  width: 100%;

  @extend %body-1;

  &__tip {
    margin-top: $base;
  }

  &--error {
    border: 1px solid var(--color-error);
  }
}
</style>
