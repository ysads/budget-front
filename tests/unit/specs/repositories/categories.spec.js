import * as api from '@/api';
import * as repository from '@/repositories/categories';
import factories from '#/factories';
import faker from 'faker';

const createParams = {
  budgetId: faker.datatype.uuid(),
  groupName: 'group one',
  name: 'category one',
};
const getParams = {
  budgetId: faker.datatype.uuid(),
  mock: true,
};

describe('CategoriesRepository', () => {
  beforeEach(() => {
    repository.categories.value = [];
    repository.groups.value = [];
  });

  describe('#categoryById', () => {
    it('finds the category group matching given id', () => {
      const categories = factories.category.buildList(3);
      repository.categories.value = categories;

      const response = repository.categoryById(categories[2].id);

      expect(response).toEqual(categories[2]);
    });
  });

  describe('#findCategoriesByGroupName', () => {
    it('filters out categories with differente group name', () => {
      const groups = [faker.animal.cat(), faker.animal.cat()];
      const categories = [
        factories.category.build({ groupName: groups[0] }),
        factories.category.build({ groupName: groups[1] }),
        factories.category.build({ groupName: groups[0] }),
      ];

      repository.categories.value = categories;

      expect(repository.findCategoriesByGroupName(groups[0])).toEqual([
        categories[0],
        categories[2],
      ]);
    });
  });

  describe('#createCategory', () => {
    it('dispatches a POST to api', async () => {
      await repository.createCategory(createParams);

      expect(api.post).toHaveBeenCalledWith(
        `budgets/${createParams.budgetId}/categories`,
        createParams,
      );
    });

    it('updates categories with newly-created resource', async () => {
      const category = factories.category.build();

      api.post.mockResolvedValueOnce(category);
      await repository.createCategory(createParams);

      expect(repository.categories.value).toEqual([category]);
    });

    it('does not add groupName to groups if it is already there', async () => {
      const category = factories.category.build({ groupName: 'group one' });

      repository.groups.value = ['group one'];
      repository.categories.value = [
        factories.category.build({ groupName: 'group one' }),
      ];

      api.post.mockResolvedValueOnce(category);
      await repository.createCategory(createParams);

      expect(repository.groups.value).toEqual(['group one']);
    });

    it('adds groupName to groups if it is not there', async () => {
      const category = factories.category.build({ groupName: 'group one' });

      repository.groups.value = ['group zero'];
      repository.categories.value = [
        factories.category.build({ groupName: 'group zero' }),
      ];

      api.post.mockResolvedValueOnce(category);
      await repository.createCategory(createParams);

      expect(repository.groups.value).toEqual(['group zero', 'group one']);
    });
  });

  describe('#getCategories', () => {
    it('dispatches a GET to api', async () => {
      api.get.mockResolvedValueOnce([]);
      await repository.getCategories(getParams);

      expect(api.get).toHaveBeenCalledWith(
        `budgets/${getParams.budgetId}/categories`,
      );
    });

    it('saves fetched resources on local categories', async () => {
      const categories = factories.category.buildList(2);

      api.get.mockResolvedValueOnce(categories);
      await repository.getCategories(getParams);

      expect(repository.categories.value).toEqual(categories);
    });

    it('collects group names from fetched resources discarding duplicates', async () => {
      const categories = [
        factories.category.build({ groupName: 'group one' }),
        factories.category.build({ groupName: 'group two' }),
        factories.category.build({ groupName: 'group one' }),
        factories.category.build({ groupName: 'group three' }),
      ];

      api.get.mockResolvedValueOnce(categories);
      await repository.getCategories(getParams);

      expect(repository.groups.value).toEqual([
        'group one',
        'group two',
        'group three',
      ]);
    });
  });
});
