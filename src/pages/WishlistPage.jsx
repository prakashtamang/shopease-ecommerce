import { useStore } from "../context/StoreContext";
import ProductCard from "../components/ProductCard";
import EmptyState from "../components/EmptyState";

const WishlistPage = () => {
  const { wishlist } = useStore();

  return (
    <div className="page-container py-12">
      <p className="text-xs font-bold uppercase tracking-widest text-indigo-600">
        Saved for later
      </p>
      <h1 className="mt-2 text-3xl font-extrabold">Your wishlist</h1>
      {wishlist.length ? (
        <>
          <p className="mt-2 text-sm text-slate-500">
            {wishlist.length} saved{" "}
            {wishlist.length === 1 ? "product" : "products"}
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      ) : (
        <EmptyState
          title="Your wishlist is waiting"
          description="Tap the heart on a product to save it here."
        />
      )}
    </div>
  );
};

export default WishlistPage;
