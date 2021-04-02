import { shallowMount } from '@vue/test-utils'

export const factoryBuilder = (component, args = {}) => {
  return shallowMount(component, {
    propsData: args.propsData,
    computed: args.computed,
    mocks: args.mocks,
    slots: args.slots,
    data () {
      return args.data || {}
    },
  })
}
