<template>
  <aside class="settings-drawer">
    <ul>
      <li class="settings-drawer__item" role="none">
        <router-link :to="{ name: 'BudgetSettings' }" role="menuitem">
          <sad-icon class="settings-drawer__icon" name="pen" />
          Budgets
        </router-link>
      </li>
      <li class="settings-drawer__item" role="none">
        <a href="#" role="menuitem">
          <sad-icon class="settings-drawer__icon" name="cash-register" />
          Payees
        </a>
      </li>
      <li class="settings-drawer__item" role="none">
        <a href="#" role="menuitem">
          <sad-icon class="settings-drawer__icon" name="tags" />
          Categories
        </a>
      </li>

      <li class="settings-drawer__item" role="none">
        <a href="#" role="menuitem">
          <sad-icon class="settings-drawer__icon" name="right-from-bracket" />
          User
        </a>
      </li>
    </ul>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import SadIcon from '../sad/SadIcon.vue';

export default defineComponent({
  components: { SadIcon },
  setup() {
    const { t } = useI18n();

    return {
      t,
    };
  },
});
</script>

<style lang="scss" scoped>
.settings-drawer {
  background: var(--sidebar-bg);
  padding: $base * 3;

  &__item {
    border-radius: $radius-8;
    color: var(--sidebar-text);
    cursor: pointer;
    transition: all ease 0.1s;
    font-size: var(--font-body2);
    font-weight: 600;
    padding: $base * 3 $base * 3;

    &:hover,
    &:focus,
    &:focus-within {
      background: var(--sidebar-focus);
    }

    &.active {
      background: var(--sidebar-active);
    }

    * {
      display: flex;
      gap: $base * 2;
      align-items: baseline;
    }
  }

  &__icon {
    width: 24px;
  }
}
</style>
