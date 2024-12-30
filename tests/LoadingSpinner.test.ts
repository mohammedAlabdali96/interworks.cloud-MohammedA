import { mount } from "@vue/test-utils";
import LoadingSpinner from "../src/components/LoadingSpinner.vue";

describe("LoadingSpinner.vue", () => {
  it("renders correctly", () => {
    const wrapper = mount(LoadingSpinner);
    expect(wrapper.find(".animate-spin").exists()).toBe(true);
  });
});
