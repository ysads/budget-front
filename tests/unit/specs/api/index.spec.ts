import Axios from 'axios';
import * as api from '@/api';

const axiosRequest = Axios.request as jest.MockedFunction<typeof Axios.request>;

const mockResponse = {
  data: [
    {
      type: 'object',
      id: 'af72bbef-15cb-4c09-8736-8218d34a742c',
      attributes: {
        name: 'Random object',
      },
    },
  ],
  included: [],
  meta: { metaInfo: 'This is a meta info' },
};

jest.unmock('@/api');
jest.mock('axios', () => ({
  request: jest.fn(),
}));

// Mock Host URL
const originalEnv = process.env.VUE_APP_API_URL;
delete process.env.VUE_APP_API_URL;
process.env.VUE_APP_API_URL = 'https://mock-host';

describe('api', () => {
  beforeEach(() => {
    axiosRequest.mockImplementationOnce(() =>
      Promise.resolve({ data: mockResponse }),
    );
  });

  afterAll(() => {
    process.env.VUE_APP_API_URL = originalEnv;
  });

  describe('#get', () => {
    it('requests api using get method', async () => {
      const mockParams = { testParam: 1 };

      await api.get('test-endpoint', mockParams);

      expect(axiosRequest).toBeCalledWith({
        headers: { Accept: 'application/json' },
        method: 'get',
        params: { test_param: 1 },
        url: 'https://mock-host/api/test-endpoint',
        withCredentials: true,
      });
    });
  });

  describe('#post', () => {
    it('requests api using post method', async () => {
      const mockParams = { testParam: 1 };

      await api.post('test-endpoint', mockParams);

      expect(axiosRequest).toBeCalledWith({
        headers: { Accept: 'application/json' },
        method: 'post',
        data: { test_param: 1 },
        url: 'https://mock-host/api/test-endpoint',
        withCredentials: true,
      });
    });
  });

  describe('#put', () => {
    it('requests api using put method', async () => {
      const mockParams = { testParam: 1 };

      await api.put('test-endpoint', mockParams);

      expect(axiosRequest).toBeCalledWith({
        headers: { Accept: 'application/json' },
        method: 'put',
        data: { test_param: 1 },
        url: 'https://mock-host/api/test-endpoint',
        withCredentials: true,
      });
    });
  });

  describe('#del', () => {
    it('requests api using delete method', async () => {
      const mockParams = { testParam: 1 };

      await api.del('test-endpoint', mockParams);

      expect(axiosRequest).toBeCalledWith({
        headers: { Accept: 'application/json' },
        method: 'delete',
        params: { test_param: 1 },
        url: 'https://mock-host/api/test-endpoint',
        withCredentials: true,
      });
    });
  });

  describe('when no VUE_APP_API_URL is set', () => {
    beforeAll(() => {
      delete process.env.VUE_APP_API_URL;
    });

    it('defaults requests to localhost', async () => {
      const mockParams = { testParam: 1 };

      await api.get('test-endpoint', mockParams);

      expect(axiosRequest).toBeCalledWith({
        headers: { Accept: 'application/json' },
        method: 'get',
        params: { test_param: 1 },
        url: 'http://localhost:9091/api/test-endpoint',
        withCredentials: true,
      });
    });
  });

  describe('when no param is given', () => {
    it('defaults request params to {}', async () => {
      await api.get('test-endpoint');

      expect(axiosRequest).toBeCalledWith({
        headers: { Accept: 'application/json' },
        method: 'get',
        params: {},
        url: 'http://localhost:9091/api/test-endpoint',
        withCredentials: true,
      });
    });
  });
});
