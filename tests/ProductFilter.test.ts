import { mount } from '@vue/test-utils';
import ProductFilter from '../src/components/ProductFilter.vue';
import type { Router, RouteLocationNormalizedLoaded } from 'vue-router';

// Mock vue-router with Jest
jest.mock('vue-router', () => ({
  useRouter: jest.fn(() => ({
    replace: jest.fn(),
  })),
  useRoute: jest.fn(() => ({
    query: {},
  })),
}));

describe('ProductFilter.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(ProductFilter);
    expect(wrapper.find('select').exists()).toBe(true);
  });

  it('updates route on category change', async () => {
    const mockRouter = {
      replace: jest.fn(),
    };

    jest.mocked(require('vue-router').useRouter).mockReturnValue(mockRouter);

    const wrapper = mount(ProductFilter);

    await wrapper.find('select').setValue('Electronics');
    expect(mockRouter.replace).toHaveBeenCalledWith({
      query: {
        category: 'Electronics',
        page: '1',
      },
    });
  });
});
