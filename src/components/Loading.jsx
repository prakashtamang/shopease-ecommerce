const Loading = ({ label = "Loading products..." }) => {
  return (
    <div className="py-20 text-center">
      <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
      <p className="mt-4 text-sm text-slate-500">{label}</p>
    </div>
  );
};

export default Loading;
