<template>
  <aside class="drawer">
    <ul class="drawer__nav">
      <li class="drawer__nav-item" :class="activeClass('Budget')">
        <router-link class="drawer__nav-link" :to="{ name: 'Budget' }">
          <sad-icon class="icon" name="piggy-bank" />{{ t('budget') }}
        </router-link>
      </li>

      <li class="drawer__nav-item" :class="activeClass('Reports')">
        <router-link class="drawer__nav-link" to="#">
          <sad-icon class="icon" name="chart-area" />{{ t('reports') }}
        </router-link>
      </li>

      <li
        class="drawer__nav-item"
        :class="activeClass('AllAccounts')"
        data-test="all-accounts-item"
      >
        <router-link
          class="drawer__nav-link"
          :to="{ name: 'AllAccounts' }"
          data-test="all-accounts-link"
        >
          <sad-icon class="icon" name="university" />{{ t('allAccounts') }}
        </router-link>
      </li>
    </ul>

    <el-collapse
      v-if="anyAccounts"
      v-model="activeNames"
      class="drawer__accounts"
      data-test="accounts-accordion"
    >
      <account-accordion
        class="drawer__accounts-list"
        :accounts="budgetAccounts"
        :budget="openBudget"
        :label="t(`budgetAccounts`)"
        name='budget'
        data-test="budget-accounts-accordion"
      />
      <account-accordion
        class="drawer__accounts-list"
        :accounts="trackingAccounts"
        :budget="openBudget"
        :label="t(`trackingAccounts`)"
        name='tracking'
        data-test="tracking-accounts-accordion"
      />
    </el-collapse>

    <div
      v-else
      class="drawer__accounts--empty"
      data-test="empty-accounts-text"
    >
      <strong>{{ t('noAccounts') }}</strong>
      <p class="tip">{{ t('noAccountsTip') }}</p>
    </div>

    <sad-button
      class="drawer__accounts-btn"
      icon="plus"
      data-test="add-account-btn"
      @click="toggleModal"
    >
      {{ t('addAccount') }}
    </sad-button>

    <create-account-modal
      v-if="modalVisible"
      :budget="openBudget"
      data-test="create-account-modal"
      @close="toggleModal"
    />
  </aside>
</template>

<script>
import AccountAccordion from '@/components/accounts/AccountAccordion'
import CreateAccountModal from '@/components/accounts/CreateAccountModal'
import SadButton from '@/components/sad/SadButton'
import SadIcon from '@/components/sad/SadIcon'
import { budgetAccounts, trackingAccounts } from '@/repositories/accounts'
import { openBudget } from '@/repositories/budgets'
import { useI18n } from '@/use/i18n'
import { computed, ref } from '@vue/composition-api'

export default {
  name: 'Drawer',

  components: {
    AccountAccordion,
    CreateAccountModal,
    SadButton,
    SadIcon,
  },

  setup () {
    const { t } = useI18n()
    const activeNames = ref(['budget', 'tracking'])
    const modalVisible = ref(false)
    const anyAccounts = computed(() => {
      return budgetAccounts.value?.length || trackingAccounts.value?.length
    })

    const toggleModal = () => (modalVisible.value = !modalVisible.value)

    return {
      activeNames,
      anyAccounts,
      budgetAccounts,
      modalVisible,
      openBudget,
      t,
      toggleModal,
      trackingAccounts,
    }
  },

  methods: {
    activeClass (route) {
      return this.$route.name === route ? 'active' : ''
    },
  },
}
</script>

<style lang="scss" scoped>
.drawer {
  background: var(--sidebar-bg);
  color: var(--sidebar-text);
  overflow: auto;
  padding: $base * 3;

  &__nav {
    display: flex;
    flex-flow: column;

    &-link {
      display: block;
      padding: $base * 3 $base * 3;
    }

    &-item {
      border-radius: $radius-8;
      cursor: pointer;
      transition: all ease 0.1s;

      @extend %menu;

      &:hover {
        background: var(--sidebar-focus);
      }

      &.active {
        background: var(--sidebar-active);
      }

      .icon {
        @include margin(right, 4);
      }
    }

    &-item + &-item {
      @include margin(top, 1);
    }
  }

  &__accounts {
    @include margin(top, 4);

    &-list + &-list {
      @include margin(top, 2);
    }

    &-btn {
      background: var(--sidebar-button-bg);
      border: 0;
      color: var(--sidebar-text);
      width: 100%;

      @include margin(top, 2);
      @include margin(top, 5);
      @include margin(top, 2);

      &:hover {
        background: var(--sidebar-focus);
      }
    }

    &--empty {
      background: var(--sidebar-active);
      border-radius: $radius-8;
      padding: $base * 4;

      @include margin(top, 6);
      @include margin(top, 6);

      .tip {
        color: var(--sidebar-tip);

        @extend %caption;

        @include margin(top, 4);
      }
    }
  }
}
</style>
