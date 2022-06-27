<template>
  <sad-modal
    :show="show"
    :title="title"
    data-test="modal"
    @close="$emit('close')"
  >
    <form
      class="budget-details"
      data-test="form"
      @submit.prevent="handleSubmit"
    >
      <sad-input
        v-model="form.name"
        :label="t('BudgetDetails.name')"
        name="name"
        class="budget-details__item"
        data-test="name"
      />
      <sad-select
        v-model="form.currency"
        name="currency"
        class="budget-details__item"
        :placeholder="t('placeholders.select')"
        :label="t('BudgetDetails.currency')"
        :options="currencyOptions"
        data-test="group-name"
      />
    </form>

    <template #footer>
      <div class="budget-details__footer">
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
import currencies from '@/support/currencies';
import { useCurrencyName } from '@/use/currencyName';
import { useI18n } from 'vue-i18n';
import { PropType, defineComponent, computed, ref } from 'vue';
import { Budget } from '@/types/models';
import useBudgetForm from '@/use/forms/budget-form';
// import { handleApiError } from '@/api/errors';
// import alert from '@/support/alert';
// import useBudgetForm from '@/use/forms/budget-form';

export default defineComponent({
  name: 'BudgetDetails',

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

  setup(props, { emit }) {
    const { t } = useI18n();
    const { currencyNameOf } = useCurrencyName();

    const isEdit = computed(() => Boolean(props.budget.id));
    const title = computed(() =>
      isEdit.value ? t('BudgetDetails.add') : t('BudgetDetails.edit'),
    );

    const { form } = useBudgetForm({
      budget: ref(props.budget),
      isEdit,
    });

    const currencyOptions = computed(() =>
      Object.keys(currencies).map((currency) => ({
        value: currency,
        label: `${currencyNameOf.value(currency)} • ${currency}`,
      })),
    );

    const handleSubmit = async () => {
      emit('close');
      // try {
      //   await saveForm(form);
      //   alert.success(saveMessage.value);
      //   resetForm();
      //   emit('close');
      // } catch (err) {
      //   handleApiError(err);
      // }
    };

    return {
      currencyOptions,
      form,
      handleSubmit,
      t,
      title,
    };
  },
});
</script>

<style lang="scss" scoped>
.budget-details {
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
