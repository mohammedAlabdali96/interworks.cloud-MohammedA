import { mount } from "@vue/test-utils";
import ErrorMessage from "../src/components/ErrorMessage.vue";

describe("ErrorMessage.vue", () => {
  it("renders correctly", () => {
    const message = "Test error";
    const wrapper = mount(ErrorMessage, {
      props: {
        message,
      },
    });
    expect(wrapper.text()).toContain(message);
  });
});
