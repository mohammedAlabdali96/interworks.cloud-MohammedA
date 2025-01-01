import { mount } from "@vue/test-utils";
import Pagination from "../src/components/Pagination.vue";

describe("Pagination.vue", () => {
  it("renders correctly with the correct props", () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 1,
        totalPages: 5,
      },
    });

    const prevButton = wrapper.find("button:first-of-type");
    expect(prevButton.attributes("disabled")).toBeDefined();

    const nextButton = wrapper.find("button:last-of-type");
    expect(nextButton.attributes("disabled")).toBeUndefined();

    const pageInfo = wrapper.find("span");
    expect(pageInfo.text()).toContain("Page 1 of 5");
  });

  it("disables the Next button on the last page", () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 5,
        totalPages: 5,
      },
    });

    const nextButton = wrapper.find("button:last-of-type");
    expect(nextButton.attributes("disabled")).toBeDefined();
  });

  it("emits the page-change event when Previous is clicked", async () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 2,
        totalPages: 5,
      },
    });

    const prevButton = wrapper.find("button:first-of-type");
    await prevButton.trigger("click");

    expect(wrapper.emitted("page-change")).toBeTruthy();
    expect(wrapper.emitted("page-change")![0]).toEqual([1]);
  });

  it("emits the page-change event when Next is clicked", async () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 1,
        totalPages: 5,
      },
    });

    const nextButton = wrapper.find("button:last-of-type");
    await nextButton.trigger("click");

    expect(wrapper.emitted("page-change")).toBeTruthy();
    expect(wrapper.emitted("page-change")![0]).toEqual([2]);
  });

  it("does not emit page-change event when Previous is clicked on the first page", async () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 1,
        totalPages: 5,
      },
    });

    const prevButton = wrapper.find("button:first-of-type");
    await prevButton.trigger("click");

    expect(wrapper.emitted("page-change")).toBeFalsy();
  });

  it("does not emit page-change event when Next is clicked on the last page", async () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 5,
        totalPages: 5,
      },
    });

    const nextButton = wrapper.find("button:last-of-type");
    await nextButton.trigger("click");

    expect(wrapper.emitted("page-change")).toBeFalsy();
  });
});
