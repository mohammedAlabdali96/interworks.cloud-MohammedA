import { mount } from "@vue/test-utils";
import ProductSearch from "../src/components/ProductSearch.vue";

// Mock vue-router with Jest
jest.mock("vue-router", () => ({
  useRouter: jest.fn(() => ({
    replace: jest.fn(),
  })),
  useRoute: jest.fn(() => ({
    query: {},
  })),
}));

// Mock lodash debounce to simulate proper debounce behavior
jest.mock("lodash/debounce", () =>
  jest.fn((fn, delay) => {
    let timeout: NodeJS.Timeout;
    const debounced = (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), delay);
    };
    debounced.cancel = jest.fn();
    return debounced;
  })
);

describe("ProductSearch.vue", () => {
  it("renders correctly", () => {
    const wrapper = mount(ProductSearch);
    expect(wrapper.find('input[type="text"]').exists()).toBe(true);
  });

  it("updates route on search input", async () => {
    jest.useFakeTimers();

    const mockRouter = {
      replace: jest.fn(),
    };

    jest.mocked(require("vue-router").useRouter).mockReturnValue(mockRouter);

    const wrapper = mount(ProductSearch);

    // Simulate typing in the search input
    const input = wrapper.find('input[type="text"]');
    await input.setValue("EUVA");

    // Fast typing shouldn't trigger replace immediately
    expect(mockRouter.replace).not.toHaveBeenCalled();

    // Advance timers to simulate debounce resolving
    jest.advanceTimersByTime(300);

    expect(mockRouter.replace).toHaveBeenCalledWith({
      query: {
        search: "EUVA",
        page: "1",
      },
    });

    jest.useRealTimers();
  });

  it("debounces search input", async () => {
    jest.useFakeTimers();

    const mockRouter = {
      replace: jest.fn(),
    };

    jest.mocked(require("vue-router").useRouter).mockReturnValue(mockRouter);

    const wrapper = mount(ProductSearch);

    // Simulate fast typing in the search input
    const input = wrapper.find('input[type="text"]');
    await input.setValue("E");
    await input.setValue("EU");
    await input.setValue("EUV");
    await input.setValue("EUVA");

    // Fast typing shouldn't trigger replace immediately
    expect(mockRouter.replace).not.toHaveBeenCalled();

    // Advance timers by 300ms to trigger debounce
    jest.advanceTimersByTime(300);

    expect(mockRouter.replace).toHaveBeenCalledWith({
      query: {
        search: "EUVA",
        page: "1",
      },
    });

    jest.useRealTimers();
  });
});
