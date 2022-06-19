<template>
  <sad-modal
    :show="show"
    :title="t('CreateCategoryGroupModal.title')"
    data-test="modal"
    @close="$emit('close')"
  >
    <form
      class="create-category"
      data-test="form"
      @submit.prevent="handleSubmit"
    >
      <sad-input
        v-model="form.name"
        :label="t('CreateCategoryGroupModal.name')"
        name="name"
        class="create-category__item-input"
        data-test="name"
      />
    </form>

    <template #footer>
      <div class="create-category__footer">
        <sad-button size="normal" type="primary" @click="handleSubmit">
          {{ t('general.save') }}
        </sad-button>
      </div>
    </template>
  </sad-modal>
</template>

<script lang="ts">
import SadButton from '@/components/sad/SadButton.vue';
import SadInput from '@/components/sad/SadInput.vue';
import SadModal from '@/components/sad/SadModal.vue';
import {
  categoryGroups,
  createCategoryGroup,
} from '@/repositories/category-groups';
import { Budget } from '@/types/models';
import { useI18n } from 'vue-i18n';
import { reactive, defineComponent, watch, PropType } from 'vue';

export default defineComponent({
  name: 'CreateCategoryGroupModal',

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
  },

  setup(props, { emit }) {
    const { t } = useI18n();

    const form = reactive({
      budgetId: props.budget.id,
      name: '',
    });

    watch(
      () => props.show,
      () => {
        form.name = '';
      },
    );

    const handleSubmit = () => {
      createCategoryGroup(form);
      emit('close');
    };

    return {
      createCategoryGroup,
      categoryGroups,
      form,
      handleSubmit,
      t,
    };
  },
});
</script>

<style lang="scss" scoped>
.create-category {
  &__select {
    width: 100%;
  }

  &__assistive {
    margin-bottom: $base * 4;
    margin-top: $base * 1;
  }

  &__item-input {
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
