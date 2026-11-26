import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

const StoreContext = createContext(null);

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

const initialState = {
  cart: readStorage("shopease-cart", []),
  wishlist: readStorage("shopease-wishlist", []),
  theme: readStorage("shopease-theme", "light"),
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existing = state.cart.find((item) => item.id === action.product.id);
      const cart = existing
        ? state.cart.map((item) =>
            item.id === action.product.id
              ? { ...item, quantity: item.quantity + (action.quantity || 1) }
              : item,
          )
        : [
            ...state.cart,
            { ...action.product, quantity: action.quantity || 1 },
          ];
      return { ...state, cart };
    }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.id),
      };
    case "SET_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.id
            ? { ...item, quantity: Math.max(1, action.quantity) }
            : item,
        ),
      };
    case "CLEAR_CART":
      return { ...state, cart: [] };
    case "TOGGLE_WISHLIST": {
      const exists = state.wishlist.some(
        (item) => item.id === action.product.id,
      );
      return {
        ...state,
        wishlist: exists
          ? state.wishlist.filter((item) => item.id !== action.product.id)
          : [...state.wishlist, action.product],
      };
    }
    case "TOGGLE_THEME":
      return { ...state, theme: state.theme === "light" ? "dark" : "light" };
    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("shopease-cart", JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    localStorage.setItem("shopease-wishlist", JSON.stringify(state.wishlist));
  }, [state.wishlist]);

  useEffect(() => {
    localStorage.setItem("shopease-theme", JSON.stringify(state.theme));
    document.documentElement.classList.toggle("dark", state.theme === "dark");
  }, [state.theme]);

  const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = state.cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const value = useMemo(
    () => ({ ...state, dispatch, cartCount, cartTotal }),
    [state, cartCount, cartTotal],
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used inside StoreProvider");
  return context;
}
