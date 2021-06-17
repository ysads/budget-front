<template>
  <sad-modal
    :title="t('newCategoryGroup')"
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
        :label="st('name')"
        name="name"
        class="create-category__item-input"
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
import {
  categoryGroups,
  createCategoryGroup,
} from '@/repositories/category-groups';
import useI18n from '@/use/i18n';
import { reactive, SetupContext } from '@vue/runtime-core';

export default {
  name: 'CreateCategoryGroupModal',

  props: {
    budget: {
      type: Object,
      required: true,
    },
  },

  emits: ['close'],

  components: {
    SadButton,
    SadInput,
    SadModal,
  },

  setup(props: any, { emit }: SetupContext) {
    const { st, t } = useI18n('CreateCategoryGroupModal');

    const form = reactive({
      budgetId: props.budget.id,
      name: '',
    });

    const handleSubmit = () => {
      createCategoryGroup(form);
      emit('close');
    };

    return {
      createCategoryGroup,
      categoryGroups,
      form,
      handleSubmit,
      st,
      t,
    };
  },
};
</script>

<style lang="scss" scoped>
.create-category {
  &__select {
    width: 100%;
  }

  &__assistive {
    margin-top: $base * 1;
    margin-bottom: $base * 4;
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
