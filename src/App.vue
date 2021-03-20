<template>
  <div id="app">
    <alert-container />
    <router-view/>
  </div>
</template>

<script>
import AlertContainer from '@/components/AlertContainer'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  components: {
    AlertContainer,
  },
})
</script>

<style lang="scss">
</style>
