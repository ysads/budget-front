<template>
  <base-modal
    data-test="base-modal"
    :title="t('newCategoryGroup')"
    @close="$emit('close')"
  >
    <form
      class="create-category"
      data-test="form"
      @submit.prevent="handleSubmit"
    >
      <sad-label
        class="create-category__item"
        to="name"
        :text="st('name')"
        data-test="category-group-name"
      >
        <sad-input
          ref="name"
          v-model.trim="form.name"
          name="name"
          class="create-category__item-input"
          data-test="input"
          @input="validate($v.form.name)"
        />
      </sad-label>

      <sad-tip
        v-if="hasError($v.form.name, 'required')"
        class="create-category__assistive"
        variant="error"
        :text="t('validations.required')"
      />
    </form>

    <div slot="footer" class="create-category__footer">
      <sad-button
        size="normal"
        type="primary"
        @click="handleSubmit"
      >
        {{ t('save') }}
      </sad-button>
    </div>
  </base-modal>
</template>

<script>
import BaseModal from '@/components/BaseModal'
import CategoryGroupsRepo from '@/repositories/category-groups'
import SadButton from '@/components/sad/SadButton'
import SadInput from '@/components/sad/SadInput'
import SadLabel from '@/components/sad/SadLabel'
import SadTip from '@/components/sad/SadTip'
import { required } from 'vuelidate/lib/validators'
import { useI18n } from '@/use/i18n'
import { useValidation } from '@/use/validation'

export default {
  name: 'CreateCategoryGroupModal',

  props: {
    budget: {
      type: Object,
      required: true,
    },
  },

  components: {
    BaseModal,
    SadButton,
    SadInput,
    SadLabel,
    SadTip,
  },

  data () {
    return {
      form: {
        budgetId: this.budget.id,
        name: '',
      },
    }
  },

  setup () {
    const { categoryGroups, createCategoryGroup } = CategoryGroupsRepo

    return {
      createCategoryGroup,
      categoryGroups,
      ...useI18n('CreateCategoryGroupModal'),
      ...useValidation(),
    }
  },

  validations: {
    form: {
      budgetId: { required },
      name: { required },
    },
  },

  methods: {
    handleSubmit () {
      if (!this.isValid(this.$v)) return
      this.createCategoryGroup(this.form)
      this.$emit('close')
    },
  },
}
</script>

<style lang="scss" scoped>
.create-category {
  &__select {
    width: 100%;
  }

  &__assistive {
    @include margin(top, 1);
    @include margin(bottom, 4);
  }

  &__item-input {
    width: 100%;
  }

  &__item + &__item {
    @include margin(top, 4);
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
