<template>
  <sad-modal
    :show="show"
    :title="t('newCategory')"
    data-test="modal"
    @close="$emit('close')"
  >
    <form
      class="create-category"
      data-test="form"
      @submit.prevent="handleSubmit"
    >
      <sad-select
        v-model="form.categoryGroupId"
        name="category-group"
        class="create-category__item"
        :placeholder="st('categoryGroupPlaceholder')"
        :label="st('categoryGroup')"
        :options="categoryGroupOptions"
        data-test="category-group-id"
      />
      <sad-input
        v-model="form.name"
        :label="st('name')"
        name="name"
        class="create-category__item"
        data-test="name"
      />
    </form>

    <template #footer>
      <div class="create-category__footer">
        <sad-button size="normal" type="primary" @click="handleSubmit">
          {{ t('save') }}
        </sad-button>
      </div>
    </template>
  </sad-modal>
</template>

<script lang="ts">
import SadButton from '@/components/sad/SadButton.vue';
import SadInput from '@/components/sad/SadInput.vue';
import SadModal from '@/components/sad/SadModal.vue';
import SadSelect from '@/components/sad/SadSelect.vue';
import useI18n from '@/use/i18n';
import { categoryGroups } from '@/repositories/category-groups';
import { createCategory } from '@/repositories/categories';
import {
  PropType,
  SetupContext,
  reactive,
  defineComponent,
  watch,
  computed,
} from 'vue';
import { Budget } from '@/types/models';

export default defineComponent({
  name: 'CreateCategoryModal',

  props: {
    budget: {
      type: Object as PropType<Budget>,
      required: true,
    },
    show: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['close'],

  components: {
    SadButton,
    SadInput,
    SadModal,
    SadSelect,
  },

  setup(props, { emit }: SetupContext) {
    const { st, t } = useI18n('CreateCategoryModal');
    const form = reactive({
      budgetId: props.budget.id,
      categoryGroupId: '',
      name: '',
    });

    watch(
      () => props.show,
      () => {
        form.name = '';
        form.categoryGroupId = '';
      },
    );

    const categoryGroupOptions = computed(() =>
      categoryGroups.value.map((c) => ({
        value: c.id,
        label: c.name,
      })),
    );

    const handleSubmit = () => {
      createCategory(form);
      emit('close');
    };

    return {
      createCategory,
      categoryGroupOptions,
      form,
      handleSubmit,
      st,
      t,
    };
  },
});
</script>

<style lang="scss" scoped>
.create-category {
  &__item {
    width: 100%;
  }

  &__item + &__item {
    margin-top: $base * 4;
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
