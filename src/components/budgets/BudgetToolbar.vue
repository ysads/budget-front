<template>
  <div class="budget-toolbar">
    <div>
      <sad-button
        class="budget-toolbar__button"
        icon="plus"
        type="ghost"
        size="small"
        @click="toggleCategoryGroupModal"
      >
        {{ t('newCategoryGroup') }}
      </sad-button>

      <sad-button
        class="budget-toolbar__button"
        icon="plus"
        type="ghost"
        size="small"
        @click="toggleCategoryModal"
      >
        {{ t('newCategory') }}
      </sad-button>

      <create-category-group-modal
        v-if="showCategoryGroupModal"
        :budget="openBudget"
        @close="toggleCategoryGroupModal"
      />
      <create-category-modal
        v-if="showCategoryModal"
        :budget="openBudget"
        @close="toggleCategoryModal"
      />
    </div>
  </div>
</template>

<script>
import CreateCategoryGroupModal from '@/components/category-groups/CreateCategoryGroupModal'
import CreateCategoryModal from '@/components/categories/CreateCategoryModal'
import SadButton from '@/components/sad/SadButton'
import { BUDGETS } from '@/store/namespaces'
import { createNamespacedHelpers } from 'vuex'
import { useI18n } from '@/use/i18n'

const budgetsHelper = createNamespacedHelpers(BUDGETS)

export default {
  props: {
    budget: {
      type: Object,
      required: true,
    },
  },

  components: {
    CreateCategoryModal,
    CreateCategoryGroupModal,
    SadButton,
  },

  data () {
    return {
      showCategoryGroupModal: false,
      showCategoryModal: false,
    }
  },

  setup () {
    const { t } = useI18n()
    return { t }
  },

  computed: {
    ...budgetsHelper.mapState(['openBudget']),
  },

  methods: {
    toggleCategoryGroupModal () {
      this.showCategoryGroupModal = !this.showCategoryGroupModal
    },

    toggleCategoryModal () {
      this.showCategoryModal = !this.showCategoryModal
    },
  },
}
</script>

<style lang="scss" scoped>
.budget-toolbar {
  display: flex;
  padding: $base*2 $base*4;
  border-bottom: 1px solid var(--acc-toolbar-border);
  justify-content: space-between;
  // box-shadow: $shadow-4;
}
</style>
