import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { getProducts } from "../services/productService";
import { SlidersHorizontal, X } from "lucide-react";
import { ProductSkeleton } from "../components/Loading";
import ProductCard from "../components/ProductCard";

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(
    searchParams.get("category") || "all",
  );
  const [sort, setSort] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(2000);
  const [minRating, setMinRating] = useState("0");
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setCategory(() => searchParams.get("category") || "all");
  }, [searchParams]);

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))].sort(),
    [products],
  );

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        category === "all" || product.category === category;
      return (
        matchesSearch &&
        matchesCategory &&
        product.price <= maxPrice &&
        product.rating >= Number(minRating)
      );
    });
    if (sort === "price-low") result.sort((a, b) => a.price - b.price);
    if (sort === "price-high") result.sort((a, b) => b.price - a.price);
    if (sort === "rating") result.sort((a, b) => b.rating - a.rating);
    if (sort === "title") result.sort((a, b) => a.title.localeCompare(b.title));
    return result;
  }, [products, search, category, maxPrice, minRating, sort]);

  function updateCategory(value) {
    setCategory(value);
    const next = new URLSearchParams(searchParams);
    if (value === "all") next.delete("category");
    else next.set("category", value);
    setSearchParams(next);
  }

  const resetFilters = () => {
    setSearch("");
    updateCategory("all");
    setMaxPrice(2000);
    setMinRating("0");
    setSort("featured");
  };

  return (
    <div className="page-container py-10">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-indigo-600">
          The collection
        </p>
        <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
          All products
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Find something you'll love from our collection.
        </p>
      </div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by product name or description..."
          className="input flex-1"
        />
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="btn-secondary sm:hidden"
        >
          <SlidersHorizontal size={17} /> Filters
        </button>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="input sm:max-w-52"
        >
          <option value="featured">Sort: Featured</option>
          <option value="price-low">Price: Low to high</option>
          <option value="price-high">Price: High to low</option>
          <option value="rating">Top rated</option>
          <option value="title">Name: A to Z</option>
        </select>
      </div>
      <div className="grid gap-7 lg:grid-cols-[230px_1fr]">
        <aside
          className={`${filtersOpen ? "block" : "hidden"} h-fit space-y-6 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 lg:block`}
        >
          <div className="flex items-center justify-between">
            <h2 className="font-extrabold">Filters</h2>
            <button
              onClick={resetFilters}
              className="text-xs font-bold text-indigo-600"
            >
              Reset all
            </button>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-bold">Category</h3>
            <div className="max-h-60 space-y-2 overflow-auto">
              <label className="flex cursor-pointer items-center gap-2 text-sm capitalize">
                <input
                  type="radio"
                  name="category"
                  checked={category === "all"}
                  onChange={() => updateCategory("all")}
                />{" "}
                All categories
              </label>
              {categories.map((item) => (
                <label
                  key={item}
                  className="flex cursor-pointer items-center gap-2 text-sm capitalize"
                >
                  <input
                    type="radio"
                    name="category"
                    checked={category === item}
                    onChange={() => updateCategory(item)}
                  />{" "}
                  {item.replaceAll("-", " ")}
                </label>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-2 flex justify-between">
              <h3 className="text-sm font-bold">Maximum price</h3>
              <span className="text-sm text-slate-500">${maxPrice}</span>
            </div>
            <input
              type="range"
              min="0"
              max="2000"
              step="25"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>
          <div>
            <h3 className="mb-3 text-sm font-bold">Minimum rating</h3>
            <select
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
              className="input"
            >
              <option value="0">Any rating</option>
              <option value="3">3 stars & up</option>
              <option value="4">4 stars & up</option>
              <option value="4.5">4.5 stars & up</option>
            </select>
          </div>
        </aside>
        <section>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              <strong className="text-slate-900 dark:text-white">
                {filteredProducts.length}
              </strong>{" "}
              products found
            </p>
            {(search || category !== "all") && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-xs font-semibold text-indigo-600"
              >
                <X size={14} /> Clear search and category
              </button>
            )}
          </div>
          {loading ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="rounded-xl bg-red-50 p-5 text-sm text-red-600">
              {error}
            </div>
          ) : filteredProducts.length ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="surface py-16 text-center">
              <p className="font-bold">No products found</p>
              <p className="mt-2 text-sm text-slate-500">
                Try changing your search or filters.
              </p>
              <button onClick={resetFilters} className="btn-primary mt-5">
                Clear filters
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ProductsPage;
