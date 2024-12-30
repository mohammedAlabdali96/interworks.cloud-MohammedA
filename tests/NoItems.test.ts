import { mount } from '@vue/test-utils';
import NoItems from '../src/components/NoItems.vue';

describe('NoItems.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(NoItems);
    expect(wrapper.text()).toContain('No Items Found');
  });
});
