<template>
  <div>
    <button
      class="budget-menu"
      aria-haspopup="menu"
      aria-controls="popup"
      :aria-expanded="isOpen"
      @click="toggle"
    >
      <span>
        <span class="budget-menu__name"> {{ openBudget.name }} </span><br />
        <span>{{ currentUser.email }}</span>
      </span>
      <sad-icon class="budget-menu__icon" name="caret-down" />
    </button>
    <ul id="popup" class="budget-menu__popup" :class="popupClasses" role="menu">
      <li class="budget-menu__popup-item" role="none">
        <a href="#" role="menuitem">
          <sad-icon class="budget-menu__popup-icon" name="notes-medical" />All
          budgets</a
        >
      </li>
      <li class="budget-menu__popup-item" role="none">
        <a href="#" role="menuitem">
          <sad-icon class="budget-menu__popup-icon" name="pen" />Edit budget
        </a>
      </li>
      <hr class="budget-menu__popup-separator" />
      <li class="budget-menu__popup-item" role="none">
        <a href="#" role="menuitem"
          ><sad-icon class="budget-menu__popup-icon" name="cash-register" />
          Manage payees</a
        >
      </li>
      <li class="budget-menu__popup-item" role="none">
        <a href="#" role="menuitem">
          <sad-icon class="budget-menu__popup-icon" name="tags" />Manage
          categories</a
        >
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import SadIcon from '@/components/sad/SadIcon.vue';
import { computed, defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { currentUser } from '@/repositories/auth';
import { openBudget } from '@/repositories/budgets';

export default defineComponent({
  components: {
    SadIcon,
  },
  setup() {
    const isOpen = ref(false);
    const { t } = useI18n();

    const toggle = () => (isOpen.value = !isOpen.value);
    const popupClasses = computed(() => ({
      'budget-menu__popup--open': isOpen.value,
    }));

    return { currentUser, isOpen, openBudget, popupClasses, t, toggle };
  },
});
</script>

<style lang="scss" scoped>
.budget-menu {
  cursor: pointer;
  margin: 0;
  padding: $base * 4 $base * 2;
  display: inline-block;
  position: relative;
  background: none;
  width: 100%;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  margin-bottom: $base * 4;
  transition: all ease 0.1s;

  &:hover,
  &:focus {
    background: var(--sidebar-focus);
  }

  &__name {
    font-size: var(--font-title2);
    font-weight: 600;
  }
  &__icon {
    margin-right: $base * 2;
  }
  &__popup {
    margin: 0;
    padding: $base * 3 0;
    overflow: hidden;
    list-style: none;
    display: none;
    position: absolute;
    border-radius: 5px;
    color: var(--text-primary);
    background: var(--budget-menu-popup-bg);
    box-shadow: var(--budget-menu-popup-shadow);

    &--open {
      display: block;
    }

    &-item {
      padding: $base * 2 $base * 5;

      a {
        display: flex;
        gap: $base * 2;
        align-items: center;
      }

      &:focus-within {
        background: rgb(216 222 227);
      }
    }

    &-icon {
      width: 24px;
      color: var(--text-secondary);
    }

    &-separator {
      border: 1px solid var(--budget-menu-separator);
      border-radius: 2px;
      margin: $base * 2 $base * 4;
    }
  }
}
</style>
