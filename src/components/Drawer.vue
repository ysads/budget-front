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

    <el-button
      class="drawer__accounts-btn"
      size="small"
    >
      <i class="icon fas fa-plus" />
      {{ $t('addAccount') }}
    </el-button>
  </aside>
</template>

<script>
import AccountAccordion from '@/components/accounts/AccountAccordion'
import { createNamespacedHelpers } from 'vuex'
import { BUDGETS, ACCOUNTS } from '@/store/namespaces'

const accountsHelper = createNamespacedHelpers(ACCOUNTS)
const budgetsHelper = createNamespacedHelpers(BUDGETS)

export default {
  name: 'Drawer',

  data () {
    return {
      activeNames: ['budget', 'tracking'],
    }
  },

  components: {
    AccountAccordion,
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

      &:hover {
        background: var(--sidebar-focus);
      }

      &.active {
        background: var(--sidebar-active);
      }

      .icon {
        @include margin(right, 4);
      }

      @extend %menu;
    }

    &-item + &-item {
      @include margin(top, 1);
    }
  }

  &__accounts {
    &-list + &-list {
      @include margin(top, 2);
    }

    &-btn {
      background: var(--sidebar-button-bg);
      border: 0;
      color: var(--sidebar-text);

      &:hover {
        background: var(--sidebar-focus);
      }

      @include margin(top, 2);
    }

    &--empty {
      background: var(--sidebar-active);
      border-radius: $radius-8;
      padding: $base * 4;

      .tip {
        color: var(--sidebar-tip);

        @extend %caption;

        @include margin(top, 4);
      }

      @include margin(top, 6);
    }

    @include margin(top, 4);
  }
}
</style>
