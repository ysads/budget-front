import cloneDeep from 'lodash/cloneDeep'
import merge from 'lodash/merge'
import Vue from 'vue'
import Vuex from 'vuex'
import { modules } from '@/store'
import { shallowMount } from '@vue/test-utils'

Vue.use(Vuex)

export const factoryBuilder = (component, args = {}) => {
  return shallowMount(component, {
    propsData: args.propsData,
    computed: args.computed,
    mocks: args.mocks,
    slots: args.slots,
    store: new Vuex.Store({
      modules: merge(cloneDeep(modules), args.store || {})
    })
  })
}
