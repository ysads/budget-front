import { get, post } from '@/api';
import { BudgetReq } from '@/types/api';
import { Category } from '@/types/models';
import { ref } from 'vue';

export interface ApiCategoryMutation {
  budgetId: string;
  groupName: string;
  name: string;
}

export const categories = ref<Category[]>([]);
export const groups = ref<string[]>([]);

export const findCategoriesByGroupName = (group: string): Category[] => {
  return categories.value.filter((c: Category) => c.groupName === group);
};

export const categoryById = (id: string): Category | undefined => {
  return categories.value.find((c: Category) => c.id === id);
};

export const createCategory = async (
  params: ApiCategoryMutation,
): Promise<void> => {
  const category = await post(`budgets/${params.budgetId}/categories`, params);

  categories.value.push(category);
  updateGroups([...categories.value, category]);
};

export const getCategories = async (params: BudgetReq): Promise<void> => {
  const response = await get(`budgets/${params.budgetId}/categories`);

  categories.value = response;
  updateGroups(response);
};

const updateGroups = (newCategories: Category[]) => {
  const uniqueGroups = new Set<string>();

  for (const c of newCategories) {
    uniqueGroups.add(c.groupName);
  }

  groups.value = Array.from(uniqueGroups);
};
