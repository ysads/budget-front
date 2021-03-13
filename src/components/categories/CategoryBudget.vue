<template>
  <li>
    {{ category.name }}
  </li>
</template>

<script>
export default {
  name: 'CategoryBudget',

  props: {
    budget: {
      type: Object,
      required: true,
    },
    category: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
