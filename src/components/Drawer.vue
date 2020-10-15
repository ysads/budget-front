<template>
  <aside class="drawer">
    <ul class="drawer__nav">
      <li class="drawer__nav-item" :class="activeClass('Budget')">
        <i class="icon fas fa-piggy-bank"></i>{{ $t('budget') }}
      </li>
      <li class="drawer__nav-item" :class="activeClass('Reports')">
        <i class="icon fas fa-chart-area"></i>{{ $t('reports') }}
      </li>
      <li class="drawer__nav-item" :class="activeClass('AllAccounts')">
        <i class="icon fas fa-university"></i>{{ $t('allAccounts') }}
      </li>
    </ul>

    <el-collapse
      v-if="anyAccounts"
      v-model="activeNames"
      class="drawer__accounts"
    >
      <account-accordion
        class="drawer__accounts-list"
        :accounts="budgetAccounts"
        :label="$t(`budgetAccounts`)"
        name='budget'
      />
      <account-accordion
        class="drawer__accounts-list"
        :accounts="trackingAccounts"
        :label="$t(`trackingAccounts`)"
        name='tracking'
      />
    </el-collapse>

    <div v-else class="drawer__accounts--empty">
      <strong>{{ $t('noAccounts') }}</strong>
      <p class="tip">{{ $t('noAccountsTip') }}</p>
    </div>

    <sad-button
      class="drawer__accounts-btn"
      icon="plus"
      @click="toggleModal"
    >
      {{ $t('addAccount') }}
    </sad-button>

    <create-account-modal
      v-if="modalVisible"
      :budget="openBudget"
      @close="toggleModal"
    />
  </aside>
</template>

<script>
import AccountAccordion from '@/components/accounts/AccountAccordion'
import CreateAccountModal from '@/components/accounts/CreateAccountModal'
import SadButton from '@/components/sad/SadButton'
import { createNamespacedHelpers } from 'vuex'
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
    ...accountsHelper.mapGetters(['budgetAccounts', 'trackingAccounts']),
    ...budgetsHelper.mapState(['openBudget']),

    anyAccounts () {
      return this.budgetAccounts?.length || this.trackingAccounts?.length
    },
  },

  mounted () {
    this.fetchAccounts()
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

    &-item {
      border-radius: $radius-8;
      cursor: pointer;
      padding: $base * 2 $base * 3;
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

      &:hover {
        background: var(--sidebar-focus);
      }
    }

    &--empty {
      background: var(--sidebar-active);
      border-radius: $radius-8;
      padding: $base * 4;

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
