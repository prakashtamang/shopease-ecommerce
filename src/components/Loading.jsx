const Loading = ({ label = "Loading products..." }) => {
  return (
    <div className="py-20 text-center">
      <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
      <p className="mt-4 text-sm text-slate-500">{label}</p>
    </div>
  );
};

export const ProductSkeleton = () => {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
      <div className="aspect-4/3 bg-slate-200 dark:bg-slate-800" />
      <div className="space-y-3 p-4">
        <div className="h-3 w-1/3 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-4 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-4 w-1/2 rounded bg-slate-200 dark:bg-slate-800" />
      </div>
    </div>
  );
};

export default Loading;
