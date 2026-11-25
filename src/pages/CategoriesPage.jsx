import { useEffect, useState } from "react";
import { getCategories } from "../services/productService";
import Loading from "../components/Loading";
import { Link } from "react-router";

const visuals = [
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700",
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=700",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700",
];

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-container py-12">
      <p className="text-xs font-bold uppercase tracking-widest text-indigo-600">
        Find your corner
      </p>
      <h1 className="mt-2 text-4xl font-extrabold">Categories</h1>
      <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
        Explore the collection by category and discover products picked for your
        everyday.
      </p>
      {loading ? (
        <Loading label="Loading categories..." />
      ) : error ? (
        <p className="mt-8 text-red-500">{error}</p>
      ) : (
        <div className="mt-9 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((category, index) => (
            <Link
              key={category.slug}
              to={`/products?category=${encodeURIComponent(category.slug)}`}
              className="group relative h-52 overflow-hidden rounded-2xl bg-slate-200 sm:h-64"
            >
              <img
                src={visuals[index % visuals.length]}
                alt=""
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-lg font-extrabold capitalize text-white">
                  {category.name}
                </p>
                <p className="mt-1 text-xs text-slate-200">
                  Explore collection →
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
