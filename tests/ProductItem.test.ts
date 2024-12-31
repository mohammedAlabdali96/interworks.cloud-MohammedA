import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import ProductItem from "../src/components/ProductItem.vue";
import { useProductStore } from "../src/stores/productStore";

describe("ProductItem.vue", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  const mockProduct = {
    id: 1,
    name: "Test Product",
    price: 99.99,
    image: "test.jpg",
    description: "Test description",
    categories: ["Electronics"],
  };

  it("renders correctly", () => {
    const wrapper = mount(ProductItem, {
      props: {
        product: mockProduct,
      },
    });

    expect(wrapper.find("h3").text()).toBe(mockProduct.name);
    expect(wrapper.find("img").attributes("src")).toBe(mockProduct.image);
    expect(wrapper.find("img").attributes("alt")).toBe(mockProduct.name);
    expect(wrapper.text()).toContain(mockProduct.description);
    expect(wrapper.text()).toContain(mockProduct.price.toString());
  });

  it("adds product to basket when button is clicked", async () => {
    const wrapper = mount(ProductItem, {
      props: {
        product: mockProduct,
      },
    });

    await wrapper.find("button").trigger("click");
    const store = useProductStore();
    expect(store.basket).toContainEqual(
      expect.objectContaining({
        id: mockProduct.id,
        quantity: 1,
      })
    );
  });
});
