<template>
  <sad-modal
    :show="show"
    :title="t('CreateCategoryModal.title')"
    data-test="modal"
    @close="$emit('close')"
  >
    <form
      class="create-category"
      data-test="form"
      @submit.prevent="handleSubmit"
    >
      <sad-select
        v-model="form.groupName"
        name="category-group"
        class="create-category__item"
        :placeholder="t('placeholders.select')"
        :label="t('CreateCategoryModal.categoryGroup')"
        :no-data-text="t('CreateCategoryModal.noGroups')"
        :options="categoryGroupOptions"
        allow-create
        data-test="group-name"
      />
      <sad-input
        v-model="form.name"
        :label="t('CreateCategoryModal.name')"
        name="name"
        class="create-category__item"
        data-test="name"
      />
      <sad-checkbox
        v-model="form.isRecurring"
        class="create-category__item"
        :label="t('CreateCategoryModal.isRecurring')"
        :tip="t('CreateCategoryModal.isRecurringTip')"
        name="recurring"
        data-test="recurring"
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
import SadSelect from '@/components/sad/SadSelect.vue';
import SadCheckbox from '@/components/sad/SadCheckbox.vue';

import { useI18n } from 'vue-i18n';
import { createCategory, groups } from '@/repositories/categories';
import { PropType, defineComponent, computed, ref } from 'vue';
import { Budget } from '@/types/models';
import { handleApiError } from '@/api/errors';
import alert from '@/support/alert';
import useCategoryForm from '@/use/forms/category-form';

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
    SadCheckbox,
  },

  setup(props, { emit }) {
    const { t } = useI18n();
    const { form, resetForm, saveForm, saveMessage } = useCategoryForm({
      budget: ref(props.budget),
    });

    const categoryGroupOptions = computed(() =>
      groups.value.map((group) => ({
        value: group,
        label: group,
      })),
    );

    const handleSubmit = async () => {
      try {
        await saveForm(form);
        alert.success(saveMessage.value);
        resetForm();
        emit('close');
      } catch (err) {
        handleApiError(err);
      }
    };

    return {
      createCategory,
      categoryGroupOptions,
      form,
      handleSubmit,
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
