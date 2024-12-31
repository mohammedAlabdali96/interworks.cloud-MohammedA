import { mount } from "@vue/test-utils";
import ProductSort from "../src/components/ProductSort.vue";

// Mock vue-router with Jest
jest.mock("vue-router", () => ({
  useRouter: jest.fn(() => ({
    replace: jest.fn(),
  })),
  useRoute: jest.fn(() => ({
    query: {},
  })),
}));

describe("ProductSort.vue", () => {
  it("renders correctly", () => {
    const wrapper = mount(ProductSort);
    expect(wrapper.find("select").exists()).toBe(true);
  });

  it("updates route on sort change", async () => {
    const mockRouter = {
      replace: jest.fn(),
    };

    jest.mocked(require("vue-router").useRouter).mockReturnValue(mockRouter);

    const wrapper = mount(ProductSort);

    // Simulate changing the select value
    await wrapper.find("select").setValue("price_asc");
    expect(mockRouter.replace).toHaveBeenCalledWith({
      query: {
        sort: "price_asc",
        page: "1",
      },
    });
  });
});
