import { ShoppingBag } from "lucide-react";
import { Link } from "react-router";

const EmptyState = ({
  title,
  description,
  action = "Explore products",
  to = "/products",
}) => {
  return (
    <div className="surface mx-auto my-10 max-w-xl px-6 py-16 text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950">
        <ShoppingBag size={28} />
      </div>
      <h2 className="mt-5 text-xl font-extrabold">{title}</h2>
      <p className="mt-2 text-sm text-slate-500">{description}</p>
      <Link to={to} className="btn-primary mt-6">
        {action}
      </Link>
    </div>
  );
};

export default EmptyState;
