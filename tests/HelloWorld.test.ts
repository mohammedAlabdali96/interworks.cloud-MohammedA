import { mount } from "@vue/test-utils";
import HelloWorld from "../src/components/HelloWorld.vue";

describe("HelloWorld.vue", () => {
  it("renders correctly", () => {
    const wrapper = mount(HelloWorld);
    expect(wrapper.html()).toContain("Hello World");
  });
});
