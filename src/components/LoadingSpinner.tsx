const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-40 w-80">
      <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent" />
    </div>
  );
};

export default LoadingSpinner;