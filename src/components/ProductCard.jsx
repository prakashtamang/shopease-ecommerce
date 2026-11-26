import { Heart, ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router";
import { useStore } from "../context/StoreContext";

const money = (value) => `$${Number(value).toFixed(2)}`;

const ProductCard = ({ product }) => {
  const { dispatch, wishlist } = useStore();
  const isSaved = wishlist.some((item) => item.id === product.id);

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <div className="relative aspect-4/3 overflow-hidden bg-slate-100 p-5 dark:bg-slate-800">
        <Link
          to={`/products/${product.id}`}
          className="grid h-full place-items-center"
        >
          <img
            src={product.thumbnail || product.images?.[0]}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
          />
        </Link>
        {product.discountPercentage > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-indigo-600 px-2.5 py-1 text-xs font-bold text-white">
            {Math.round(product.discountPercentage)}% OFF
          </span>
        )}
        <button
          aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => dispatch({ type: "TOGGLE_WISHLIST", product })}
          className={`absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white shadow-sm transition ${isSaved ? "text-pink-500" : "text-slate-500 hover:text-pink-500"}`}
        >
          <Heart size={17} fill={isSaved ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="p-4">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-indigo-600">
          {product.category}
        </p>
        <Link
          to={`/products/${product.id}`}
          className="line-clamp-2 min-h-11 font-bold text-slate-900 hover:text-indigo-600 dark:text-white"
        >
          {product.title}
        </Link>
        <div className="mt-3 flex items-center justify-between">
          <div>
            <p className="font-extrabold">{money(product.price)}</p>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
              <Star size={12} className="fill-amber-400 text-amber-400" />{" "}
              {product.rating?.toFixed(1) || "New"}
            </p>
          </div>
          <button
            aria-label="Add to cart"
            onClick={() => dispatch({ type: "ADD_TO_CART", product })}
            className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-50 text-indigo-700 transition hover:bg-indigo-600 hover:text-white dark:bg-indigo-950 dark:text-indigo-300"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
