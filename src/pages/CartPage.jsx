import { useStore } from "../context/StoreContext";
import EmptyState from "../components/EmptyState";
import { Link } from "react-router";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

const money = (value) => `$${value.toFixed(2)}`;
const CartPage = () => {
  const { cart, cartTotal, dispatch } = useStore();

  if (!cart.length)
    return (
      <div className="page-container py-10">
        <EmptyState
          title="Your cart is empty"
          description="Looks like you haven't added anything to your cart yet."
        />
      </div>
    );
  return (
    <div className="page-container py-12">
      <p className="text-xs font-bold uppercase tracking-widest text-indigo-600">
        Your selections
      </p>
      <h1 className="mt-2 text-3xl font-extrabold">Shopping cart</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
        <section className="space-y-4">
          {cart.map((item) => (
            <article
              key={item.id}
              className="surface flex gap-4 p-4 sm:gap-6 sm:p-5"
            >
              <Link
                to={`/products/${item.id}`}
                className="grid h-28 w-28 shrink-0 place-items-center rounded-xl bg-slate-50 p-3 dark:bg-slate-800"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-full w-full object-contain"
                />
              </Link>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs capitalize text-indigo-600">
                      {item.category}
                    </p>
                    <Link
                      to={`/products/${item.id}`}
                      className="mt-1 line-clamp-2 font-bold hover:text-indigo-600"
                    >
                      {item.title}
                    </Link>
                  </div>
                  <button
                    aria-label="Remove item"
                    onClick={() =>
                      dispatch({ type: "REMOVE_FROM_CART", id: item.id })
                    }
                    className="text-slate-400 hover:text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center rounded-lg border border-slate-200 dark:border-slate-700">
                    <button
                      aria-label="Decrease quantity"
                      onClick={() =>
                        dispatch({
                          type: "SET_QUANTITY",
                          id: item.id,
                          quantity: item.quantity - 1,
                        })
                      }
                      className="p-2"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="min-w-8 text-center text-sm font-bold">
                      {item.quantity}
                    </span>
                    <button
                      aria-label="Increase quantity"
                      onClick={() =>
                        dispatch({
                          type: "SET_QUANTITY",
                          id: item.id,
                          quantity: item.quantity + 1,
                        })
                      }
                      className="p-2"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <p className="font-extrabold">
                    {money(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            </article>
          ))}
          <button
            onClick={() => dispatch({ type: "CLEAR_CART" })}
            className="text-sm font-semibold text-red-500 hover:text-red-600"
          >
            Clear cart
          </button>
        </section>
        <aside className="surface h-fit p-6">
          <h2 className="text-lg font-extrabold">Order summary</h2>
          <div className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between text-slate-500">
              <span>Subtotal</span>
              <span>{money(cartTotal)}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Shipping</span>
              <span className="font-semibold text-emerald-600">Free</span>
            </div>
            <div className="border-t border-slate-200 pt-4 dark:border-slate-700">
              <div className="flex justify-between text-base font-extrabold">
                <span>Total</span>
                <span>{money(cartTotal)}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() =>
              window.alert(
                "This is a learning demo. Payment and order processing are not connected.",
              )
            }
            className="btn-primary mt-6 w-full"
          >
            Proceed to checkout <ArrowRight size={17} />
          </button>
          <Link
            to="/products"
            className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600"
          >
            <ShoppingBag size={16} /> Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
};

export default CartPage;
