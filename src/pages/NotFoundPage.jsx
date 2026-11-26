import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div className="page-container py-28 text-center">
      <p className="text-7xl font-black text-indigo-600">404</p>
      <h1 className="mt-4 text-2xl font-extrabold">Page not found</h1>
      <p className="mt-2 text-sm text-slate-500">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <Link to="/" className="btn-primary mt-7">
        Back to home
      </Link>
    </div>
  );
};

export default NotFoundPage;
