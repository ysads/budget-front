<template>
  <div class="budget-details">
    <div v-if="budget">
      {{ budget.name }}
    </div>
    <div v-else>selecione algo para começar</div>
  </div>
</template>

<script lang="ts">
import { Budget } from '@/types/models';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    budget: {
      type: Object as PropType<Budget | null>,
      default: null,
    },
  },
});
</script>

<style lang="scss" scoped>
.budget-details {
  width: 300px;
  border-left: 1px solid var(--budget-menu-separator);
  height: 100%;
}
</style>
