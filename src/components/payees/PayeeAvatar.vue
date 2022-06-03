<template>
  <div class="payee-avatar">
    <sad-icon v-if="icon" :name="icon" color="inherit" />
    <img v-else-if="payee.avatarUrl" :src="payee.avatarUrl" />
    <span v-else>{{ payeeAbbrev }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Payee } from '@/types/models';
import SadIcon from '@/components/sad/SadIcon.vue'

export default defineComponent({
  props: {
    payee: {
      type: Object as PropType<Payee>,
      default: null,
    },
    icon: {
      type: String,
      default: '',
    },
  },
  components: {
    SadIcon,
  },
  setup(props) {
    const payeeAbbrev = props.icon
      ? ''
      : props.payee.name.indexOf(' ') > -1
      ? props.payee.name
          .split(' ')
          .map((c) => c[0])
          .join('')
      : props.payee.name.substring(0, 2);

    return {
      payeeAbbrev,
    };
  },
});
</script>

<style lang="scss" scoped>
.payee-avatar {

}
</style>
