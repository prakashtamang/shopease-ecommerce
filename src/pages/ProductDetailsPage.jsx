import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { getProductById } from "../services/productService";
import { useStore } from "../context/StoreContext";
import Loading from "../components/Loading";
import {
  ArrowLeft,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { dispatch, wishlist } = useStore();

  useEffect(() => {
    setLoading(true);
    getProductById(id)
      .then(setProduct)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
    setSelectedImage(0);
    setQuantity(1);
  }, [id]);

  if (loading)
    return (
      <div className="page-container">
        <Loading label="Loading product details..." />
      </div>
    );
  if (error || !product)
    return (
      <div className="page-container py-20 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <p className="mt-2 text-sm text-slate-500">{error}</p>
        <Link className="btn-primary mt-6" to="/products">
          Back to shop
        </Link>
      </div>
    );

  const images = product.images?.length ? product.images : [product.thumbnail];
  const isSaved = wishlist.some((item) => item.id === product.id);

  return (
    <div className="page-container py-10">
      <Link
        to="/products"
        className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600"
      >
        <ArrowLeft size={16} /> Back to products
      </Link>
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <div className="grid aspect-square place-items-center rounded-3xl bg-white p-8 dark:bg-slate-900">
            <img
              src={images[selectedImage]}
              alt={product.title}
              className="h-full w-full object-contain"
            />
          </div>
          <div className="mt-4 flex gap-3 overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={image}
                onClick={() => setSelectedImage(index)}
                className={`h-20 w-20 shrink-0 rounded-xl border-2 bg-white p-2 dark:bg-slate-900 ${selectedImage === index ? "border-indigo-600" : "border-slate-200 dark:border-slate-800"}`}
              >
                <img
                  src={image}
                  alt=""
                  className="h-full w-full object-contain"
                />
              </button>
            ))}
          </div>
        </div>
        <div className="py-2">
          <p className="text-xs font-bold uppercase tracking-widest text-indigo-600">
            {product.category}
          </p>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
            {product.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
            <span className="flex items-center gap-1 font-bold">
              <Star size={16} className="fill-amber-400 text-amber-400" />{" "}
              {product.rating}
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-500">
              {product.reviews?.length || 0} reviews
            </span>
            <span className="text-slate-400">·</span>
            <span
              className={
                product.stock > 0
                  ? "font-semibold text-emerald-600"
                  : "text-red-500"
              }
            >
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </span>
          </div>
          <div className="mt-6 flex items-end gap-3">
            <p className="text-4xl font-extrabold">
              ${product.price.toFixed(2)}
            </p>
            {product.discountPercentage > 0 && (
              <span className="mb-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                {Math.round(product.discountPercentage)}% off
              </span>
            )}
          </div>
          <p className="mt-6 leading-7 text-slate-600 dark:text-slate-300">
            {product.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-xl border border-slate-200 dark:border-slate-700">
              <button
                aria-label="Decrease quantity"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-3"
              >
                <Minus size={16} />
              </button>
              <span className="min-w-10 text-center text-sm font-bold">
                {quantity}
              </span>
              <button
                aria-label="Increase quantity"
                onClick={() =>
                  setQuantity((q) => Math.min(product.stock || 99, q + 1))
                }
                className="p-3"
              >
                <Plus size={16} />
              </button>
            </div>
            <button
              disabled={product.stock <= 0}
              onClick={() =>
                dispatch({ type: "ADD_TO_CART", product, quantity })
              }
              className="btn-primary flex-1"
            >
              <ShoppingCart size={18} /> Add to cart
            </button>
            <button
              aria-label="Toggle wishlist"
              onClick={() => dispatch({ type: "TOGGLE_WISHLIST", product })}
              className={`btn-secondary !p-3 ${isSaved ? "!text-pink-500" : ""}`}
            >
              <Heart size={19} fill={isSaved ? "currentColor" : "none"} />
            </button>
          </div>
          <div className="mt-8 grid gap-4 border-t border-slate-200 pt-6 dark:border-slate-800 sm:grid-cols-2">
            <div className="flex gap-3">
              <Truck className="shrink-0 text-indigo-600" />
              <div>
                <p className="text-sm font-bold">Delivery information</p>
                <p className="mt-1 text-xs text-slate-500">
                  Delivery estimates are for demo purposes.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <ShieldCheck className="shrink-0 text-indigo-600" />
              <div>
                <p className="text-sm font-bold">Shopping made simple</p>
                <p className="mt-1 text-xs text-slate-500">
                  Secure checkout is not enabled in this demo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
