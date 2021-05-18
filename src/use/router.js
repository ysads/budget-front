import { reactive } from '@vue/composition-api'
import router from '@/router/index'

const route = reactive({
  ...router.currentRoute,
})

router.afterEach((to, _from) => {
  Object.keys(to).forEach(key => {
    route[key] = to[key]
  })
})

export default function useRouter () {
  return { route, router }
}
