import JsonApi from '@/api/json-api';

const mockResponse = {
  data: [
    {
      type: 'banana',
      id: 'af72bbef-15cb-4c09-8736-8218d34a742c',
      attributes: {
        name: 'Banana',
      },
      relationships: {
        mango: {
          data: {
            id: '98c2ed1a-6023-48ea-bc83-02d50e7ffd2d',
            type: 'mango',
          },
        },
      },
    },
  ],
  included: [
    {
      type: 'mango',
      id: '98c2ed1a-6023-48ea-bc83-02d50e7ffd2d',
      attributes: {
        title: 'Mango',
      },
    },
  ],
};

describe('json-api', () => {
  it('parses response from json api format', async () => {
    const parsed = await JsonApi.parse(mockResponse);

    expect(parsed).toStrictEqual([
      {
        id: 'af72bbef-15cb-4c09-8736-8218d34a742c',
        name: 'Banana',
        mango: {
          id: '98c2ed1a-6023-48ea-bc83-02d50e7ffd2d',
          title: 'Mango',
        },
      },
    ]);
  });

  describe('when payload is falsy', () => {
    it('does not try to parse data', async () => {
      expect(await JsonApi.parse(null)).toBeFalsy();
      expect(await JsonApi.parse(undefined)).toBeFalsy();
    });
  });

  describe('when payload contains meta', () => {
    it('includes meta on parsed object', async () => {
      const mockResponseWithMeta = {
        ...mockResponse,
        meta: { metaInfo: 'This is a meta info' },
      };
      const parsed = await JsonApi.parse(mockResponseWithMeta);

      expect(parsed.meta).toEqual({
        metaInfo: 'This is a meta info',
      });
    });
  });
});
