import { get } from '@/api';
import { ref } from 'vue';
import { User } from '@/types/models';

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

export const updateAuthToken = (token: string): void => {
  localStorage.setItem('auth_token', token);
};
