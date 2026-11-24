const API_BASE = "https://dummyjson.com";

async function request(path) {
  const response = await fetch(`${API_BASE}${path}`);
  if (!response.ok) {
    throw new Error(`Request failed (${response.status}). Please try again.`);
  }
  return response.json();
}

export async function getProducts() {
  const data = await request("/products?limit=100");
  return data.products;
}

export async function getCategories() {
  const data = await request("/products/categories");
  return data.map((category) =>
    typeof category === "string"
      ? { slug: category, name: category.replaceAll("-", " ") }
      : category,
  );
}

export async function getProductById(id) {
  return request(`/products/${id}`);
}
