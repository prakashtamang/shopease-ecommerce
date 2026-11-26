import { Heart, Menu, Moon, Search, ShoppingBag, Sun, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { useStore } from "../context/StoreContext";

const navClass = ({ isActive }) =>
  `text-sm font-semibold transition ${isActive ? "text-indigo-600" : "text-slate-600 hover:text-indigo-600 dark:text-slate-300"}`;

const Header = () => {
  const { cartCount, wishlist, theme, dispatch } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const submitSearch = (event) => {
    event.preventDefault();
    navigate(`/products?search=${encodeURIComponent(search.trim())}`);
    setMobileOpen(false);
  };
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="page-container flex h-20 items-center justify-between gap-4">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 text-xl font-extrabold tracking-tight"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-600 text-white">
            <ShoppingBag size={18} />
          </span>
          Shop<span className="text-indigo-600">Ease</span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          <NavLink to="/" className={navClass}>
            Home
          </NavLink>
          <NavLink to="/products" className={navClass}>
            Shop
          </NavLink>
          <NavLink to="/categories" className={navClass}>
            Categories
          </NavLink>
        </nav>

        <form
          onSubmit={submitSearch}
          className="hidden max-w-sm flex-1 items-center md:flex"
        >
          <div className="relative w-full">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input py-2.5 pl-10"
              placeholder="Search products..."
            />
          </div>
        </form>

        <div className="flex items-center gap-2">
          <button
            aria-label="Toggle theme"
            onClick={() => dispatch({ type: "TOGGLE_THEME" })}
            className="btn-secondary rounded-full! p-2.5!"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <Link
            aria-label="Wishlist"
            to="/wishlist"
            className="relative rounded-full p-2.5 text-slate-600 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <Heart size={20} />
            {wishlist.length > 0 && (
              <span className="absolute right-0 top-0 gird min-w-4 place-items-center rounded-full bg-pink-500 px-1 text-[10px] font-bold text-white">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link
            aria-label="Shopping cart"
            to="/cart"
            className="relative rounded-full p-2.5 text-slate-600 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <ShoppingBag size={20} />{" "}
            {cartCount > 0 && (
              <span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-indigo-600 px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            aria-label="Toggle navigation"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="btn-secondary rounded-full p-2..5 md:hidden"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="page-container space-y-4 border-t border-slate-100 py-4 dark:border-slate-800 md:hidden">
          <form onSubmit={submitSearch} className="relative">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input pl-10"
              placeholder="Search products..."
            />
          </form>
          <nav className="flex flex-col gap-4">
            <NavLink
              onClick={() => setMobileOpen(false)}
              to="/"
              className={navClass}
            >
              Home
            </NavLink>
            <NavLink
              onClick={() => setMobileOpen(false)}
              to="/products"
              className={navClass}
            >
              Shop
            </NavLink>
            <NavLink
              onClick={() => setMobileOpen(false)}
              to="/categories"
              className={navClass}
            >
              Categories
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
