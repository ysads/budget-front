<template>
  <div class="collapse-wrapper" :class="{ collapsed }" data-test="collapse">
    <button
      class="header"
      data-test="header"
      :aria-expanded="!collapsed"
      :aria-controls="areaId"
      @click="toggle"
    >
      <sad-icon name="angle-down" class="caret" />
      <slot name="header" />
    </button>
    <div :id="areaId" class="content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import uuid from 'uuid-random';
import SadIcon from './SadIcon.vue';

export default defineComponent({
  props: {
    startOpen: {
      type: Boolean,
      default: true,
    },
  },

  components: {
    SadIcon,
  },

  setup(props) {
    const collapsed = ref(!props.startOpen);
    const areaId = uuid();

    const toggle = () => {
      collapsed.value = !collapsed.value;
    };

    return { areaId, collapsed, toggle };
  },
});
</script>

<style lang="scss" scoped>
$opening-bezier: cubic-bezier(0.06, 0.82, 0.57, 1.03);
$closing-bezier: cubic-bezier(0.74, 0.01, 1, 0.57);

.collapse-wrapper {
  > &:focus {
    border-radius: 4px;
    background: var(--sidebar-active);
  }
}

.header {
  align-items: center;
  border: none;
  cursor: pointer;
  display: flex;
  outline: none;
  text-align: left;
  width: 100%;
  background: none;
  color: inherit;

  &:focus,
  &:active {
    background: var(--sidebar-active);
    border-radius: var(--radius-4);
  }
}

.caret {
  margin-left: $base;
  margin-right: $base * 3;
  transition: transform 0.3s ease-in-out;
}

.content {
  max-height: 100vh;
  overflow: hidden;
  transition: max-height 0.3s $closing-bezier;
}

.collapsed {
  .caret {
    transform: rotate(-90deg);
    transition: transform 0.3s ease-in-out;
  }

  .content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s $opening-bezier;
  }
}
</style>
