<template>
  <input
    :id="name"
    v-model="val"
    class="sad-input"
    data-test="input"
    :placeholder="placeholder"
    @input="updateValue"
    @focus="cleanFormat"
    @blur="formatValue"
  />
</template>

<script>
import { VMoney } from 'v-money'

export default {
  props: {
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
  },

  data () {
    return {
      val: this.value,
    }
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

  @extend %input;
}
</style>
