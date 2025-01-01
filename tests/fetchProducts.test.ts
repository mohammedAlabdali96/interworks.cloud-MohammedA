import { fetchProducts, FetchProductsResponse } from "../src/api/products";
import { ApiError } from "../src/utils/errors";
import type { Product } from "../src/types";

describe("fetchProducts", () => {
  const mockData = {
    data: Array.from({ length: 150 }, (_, i) => ({
      id: i + 1,
      name: `Product ${i + 1}${i < 62 ? " AA" : ""}`,
      price: parseFloat((Math.random() * 100).toFixed(2)),
      image: `https://via.placeholder.com/150?text=Product+${i + 1}`,
      description: `Description for Sample Product ${i + 1}`,
      categories: i < 50 ? ["Electronics"] : i < 100 ? ["Fashion"] : ["Home"],
    })),
  };

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    ) as jest.Mock;
  });

  const runFetchProducts = async (params: any) =>
    await fetchProducts({
      page: 1,
      pageSize: 10,
      ...params,
    });

  it("fetches and paginates products correctly", async () => {
    const response = await runFetchProducts({});

    expect(response.data).toHaveLength(10);
    expect(response.totalItems).toBe(150);
    expect(response.totalPages).toBe(15);
    expect(response.data[0].name).toBe("Product 1 AA");
  });

  it("filters products by search query", async () => {
    const searchQuery = "AA";
    const response = await runFetchProducts({ search: searchQuery });

    const expectedProducts = mockData.data.filter((product: Product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    expect(response.data).toHaveLength(expectedProducts.slice(0, 10).length);
    expect(
      response.data.every((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    ).toBe(true);
    expect(response.totalItems).toBe(expectedProducts.length);
    expect(response.totalPages).toBe(Math.ceil(expectedProducts.length / 10));
  });

  it("sorts products by price ascending", async () => {
    const response = await runFetchProducts({ sortBy: "price_asc" });

    const prices = response.data.map((product) => product.price);
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  it("sorts products by price descending", async () => {
    const response = await runFetchProducts({ sortBy: "price_desc" });

    const prices = response.data.map((product) => product.price);
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });

  it.each(["Electronics", "Fashion", "Home"])(
    "filters products by category %s",
    async (category) => {
      const response = await runFetchProducts({ category });

      const expectedProducts = mockData.data.filter((product: Product) =>
        product.categories.includes(category)
      );

      expect(response.data).toHaveLength(expectedProducts.slice(0, 10).length);
      expect(
        response.data.every((product) => product.categories.includes(category))
      ).toBe(true);
      expect(response.totalItems).toBe(expectedProducts.length);
      expect(response.totalPages).toBe(Math.ceil(expectedProducts.length / 10));
    }
  );

  it("throws an error when fetch fails", async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 500,
      })
    );

    await expect(runFetchProducts({})).rejects.toThrow(ApiError);
  });

  it("throws an error when the data format is invalid", async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ invalid: "data" }),
      })
    );

    await expect(runFetchProducts({})).rejects.toThrow(
      "Invalid data format received"
    );
  });
});
