import factories from '#/factories';
import useBudgetCategories from '@/use/budget-categories';
import * as categoriesRepo from '@/repositories/categories';
import * as categoryGroupsRepo from '@/repositories/category-groups';

const categoryGroups = factories.categoryGroup.buildList(2);
const categories = [
  factories.category.build({ categoryGroupId: categoryGroups[0].id }),
  factories.category.build({ categoryGroupId: categoryGroups[0].id }),
  factories.category.build({ categoryGroupId: categoryGroups[1].id }),
];

categoriesRepo.categories.value = categories;
categoryGroupsRepo.categoryGroups.value = categoryGroups;

describe('useBudgetCategories', () => {
  describe('#categoryOptions', () => {
    it('groups real categories and adds an virtual inflow category', () => {
      const { categoryOptions } = useBudgetCategories();

      expect(categoryOptions.value).toEqual([
        {
          label: expect.stringMatching(/inflow/),
          options: [
            {
              label: expect.stringMatching(/toBeBudgeted/),
              value: '',
            },
          ],
        },
        {
          label: categoryGroups[0].name,
          options: [
            {
              label: categories[0].name,
              value: categories[0].id,
            },
            {
              label: categories[1].name,
              value: categories[1].id,
            },
          ],
        },
        {
          label: categoryGroups[1].name,
          options: [
            {
              label: categories[2].name,
              value: categories[2].id,
            },
          ],
        },
      ]);
    });
  });

  describe('#categoryName', () => {
    it('conjoins category group name and category name', () => {
      const { categoryName } = useBudgetCategories();
      const transaction = factories.transaction.build({
        categoryId: categories[2].id,
      });

      expect(categoryName(transaction)).toEqual(
        `${categoryGroups[1].name}: ${categories[2].name}`,
      );
    });

    describe('when categoryId of transaction is null', () => {
      it('equals to `inflow: toBeBudgeted`', () => {
        const { categoryName } = useBudgetCategories();
        const transaction = factories.transaction.build({ categoryId: '' });

        expect(categoryName(transaction)).toEqual(
          'budgetCategories.inflow: budgetCategories.toBeBudgeted',
        );
      });
    });
  });
});
