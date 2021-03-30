import { get, post } from '@/api'
import { ref } from '@vue/composition-api'

export const currentUser = ref(null)

export const getMe = async () => {
  if (currentUser.value) {
    return currentUser
  }

  currentUser.value = await get('me')
}

export const signIn = (params) => {
  return post('sign_in', { user: params })
}
