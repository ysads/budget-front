<template>
  <aside class="drawer">
    <ul class="drawer__nav">
      <li class="drawer__nav-item" :class="activeClass('Budget')">
        <router-link class="drawer__nav-link" :to="{ name: 'Budget' }">
          <i class="icon fas fa-piggy-bank" />{{ t('budget') }}
        </router-link>
      </li>

      <li class="drawer__nav-item" :class="activeClass('Reports')">
        <router-link class="drawer__nav-link" to="#">
          <i class="icon fas fa-chart-area" />{{ t('reports') }}
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
          <i class="icon fas fa-university" />{{ t('allAccounts') }}
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
import { createNamespacedHelpers } from 'vuex'
import { useI18n } from '@/use/i18n'
import { BUDGETS, ACCOUNTS } from '@/store/namespaces'

const accountsHelper = createNamespacedHelpers(ACCOUNTS)
const budgetsHelper = createNamespacedHelpers(BUDGETS)

export default {
  name: 'Drawer',

  data () {
    return {
      activeNames: ['budget', 'tracking'],
      modalVisible: false,
    }
  },

  components: {
    AccountAccordion,
    CreateAccountModal,
    SadButton,
  },

  computed: {
    ...accountsHelper.mapState(['accounts']),
    ...accountsHelper.mapGetters(['budgetAccounts', 'trackingAccounts']),
    ...budgetsHelper.mapState(['openBudget']),

    anyAccounts () {
      return this.budgetAccounts?.length || this.trackingAccounts?.length
    },
  },

  mounted () {
    this.fetchAccounts()
  },

  setup () {
    const { t } = useI18n()
    return { t }
  },

  methods: {
    ...accountsHelper.mapActions(['getAccounts']),

    async fetchAccounts () {
      await this.getAccounts({ budgetId: this.openBudget.id })
    },

    activeClass (route) {
      return this.$route.name === route ? 'active' : ''
    },

    toggleModal () {
      this.modalVisible = !this.modalVisible
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
