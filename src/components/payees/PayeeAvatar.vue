<template>
  <div class="payee-avatar">
    <sad-icon v-if="!payee" name="arrow-circle-right" />
    <img
      v-else-if="payeeAvatar"
      class="payee-avatar__image"
      :src="payee.avatarUrl"
    />
    <span v-else>
      {{ payeeAbbrev }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Payee } from '@/types/models';
import SadIcon from '@/components/sad/SadIcon.vue';

export default defineComponent({
  props: {
    payee: {
      type: Object as PropType<Payee>,
    },
    isTransfer: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    SadIcon,
  },
  setup(props) {
    const payeeAvatar = props.payee && props.payee.avatarUrl;
    const payeeAbbrev = !props.payee
      ? ''
      : props.payee.name.indexOf(' ') > -1
      ? props.payee.name
          .split(' ')
          .map((c) => c[0])
          .join('')
      : props.payee.name.substring(0, 2);

    return { payeeAvatar, payeeAbbrev };
  },
});
</script>

<style lang="scss" scoped>
.payee-avatar {
  background: var(--payee-bg);
  border-radius: 50%;
  color: var(--payee-text);
  display: grid;
  font-size: 14px;
  font-weight: 600;
  height: 50px;
  letter-spacing: 1px;
  place-content: center;
  text-transform: uppercase;
  width: 50px;

  &__image {
    width: 100%;
  }

  &__abbrev {
    margin: 10px;
  }
}
</style>
