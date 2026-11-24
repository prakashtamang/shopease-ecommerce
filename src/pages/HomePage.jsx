import { ArrowRight, Headphones, ShieldCheck, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getCategories, getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categoryImages = [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
  ];

  useEffect(() => {
    Promise.all([getProducts(), getCategories()])
      .then(([items, groups]) => {
        setProducts(items.slice(0, 8));
        setCategories(groups.slice(0, 4));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <section className="overflow-hidden bg-linear-to-br from-indigo-950 via-slate-900 to-slate-800 text-white">
        <div className="page-container grid min-h-130 items-center gap-10 py-16 md:grid-cols-2">
          <div className="max-w-xl">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-indigo-200">
              Discover your everyday
            </span>
            <h1 className="mt-6 text-5xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl">
              Good finds.
              <br />
              <span className="text-indigo-300">Better days.</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-7 text-slate-300">
              Explore thoughtful picks across tech, style, home and more. Your
              next favourite thing is waiting.
            </p>
            <Link
              to="/products"
              className="mt-8 inline-flex items-center gap-3 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-indigo-100"
            >
              Explore the store <ArrowRight size={18} />
            </Link>
            <div className="mt-12 flex flex-wrap gap-7 text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-2">
                <Truck size={16} /> Easy delivery
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck size={16} /> Secure checkout demo
              </span>
              <span className="flex items-center gap-2">
                <Headphones size={16} /> Here to help
              </span>
            </div>
          </div>
          <div className="relative hidden h-97 md:block">
            <div className="absolute right-10 top-2 h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl" />
            <img
              src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1000"
              alt="Featured sneakers"
              className="absolute right-0 top-5 h-85 w-[90%] rounded-4xl object-cover shadow-2xl"
            />
            <div className="absolute bottom-0 left-0 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-xl">
              <p className="text-xs text-indigo-200">THE EVERYDAY EDIT</p>
              <p className="mt-1 font-bold">Find your next favourite</p>
            </div>
          </div>
        </div>
      </section>

      <section className="page-container py-16">
        <div className="mb-7 flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-600">
              Browse by interest
            </p>
            <h2 className="mt-2 text-3xl font-extrabold">Shop categories</h2>
          </div>
          <Link
            to="/categories"
            className="hidden items-center gap-2 text-sm font-bold text-indigo-600 sm:flex"
          >
            All categories <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((category, index) => (
            <Link
              key={category.slug}
              to={`/products?category=${encodeURIComponent(category.slug)}`}
              className="group relative h-44 overflow-hidden rounded-2xl bg-slate-200 sm:h-56"
            >
              <img
                src={categoryImages[index % categoryImages.length]}
                alt=""
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 to-transparent" />
              <p className="absolute bottom-4 left-4 text-lg font-extrabold capitalize text-white">
                {category.name}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="page-container pb-16">
        <div className="mb-7 flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-600">
              Handpicked for you
            </p>
            <h2 className="mt-2 text-3xl font-extrabold">Popular picks</h2>
          </div>
          <Link
            to="/products"
            className="flex items-center gap-2 text-sm font-bold text-indigo-600"
          >
            View all <ArrowRight size={16} />
          </Link>
        </div>
        {loading ? (
          <Loading />
        ) : error ? (
          <p className="rounded-xl bg-red-50 p-5 text-sm text-red-600">
            {error}
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
