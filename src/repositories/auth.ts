import { get, post } from '@/api';
import { ref } from 'vue';
import { User } from '@/types/models';

interface ApiSignInRequest {
  email: string;
  password: string;
}

export const currentUser = ref<User>({
  defaultBudgetId: '',
  email: '',
  name: '',
});

export const getMe = async (): Promise<User> => {
  if (!currentUser.value.id) {
    currentUser.value = await get('me');
  }

  return currentUser.value;
};

export const signIn = (user: ApiSignInRequest): Promise<User> => {
  return post('sign_in', { user });
};
