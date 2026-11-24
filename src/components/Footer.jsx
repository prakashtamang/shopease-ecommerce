import { ShoppingBag } from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="page-container flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-extrabold"
          >
            <ShoppingBag className="text-indigo-600" />
            ShopEase
          </Link>
          <p>A little something for every day.</p>
        </div>
        <div className="flex flex-wrap gap-5 text-sm text-slate-500">
          <Link to="/products" className="hover:text-indigo-600">
            Shop
          </Link>
          <Link to="/categories" className="hover:text-indigo-600">
            Categories
          </Link>
          <Link to="/wishlist" className="hover:text-indigo-600">
            Wishlist
          </Link>
        </div>
        <p className="text-xs text-slate-400">
          Demo store . Product data by DummyJSON
        </p>
      </div>
    </footer>
  );
};

export default Footer;
