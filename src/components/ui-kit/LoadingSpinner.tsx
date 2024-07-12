export const LoadingSpinnerPage = () => {
  return (
    <div className="flex items-center justify-center w-full h-96">
      <div className="w-32 h-32 border-t-2 border-b-2 border-purple-500 rounded-full animate-spin" />
    </div>
  );
};

export const LoadingSpinnerTable = () => {
  return (
    <div className="flex items-center justify-center w-full h-fit">
      <div className="w-12 h-12 border-t-2 border-b-2 border-purple-500 rounded-full animate-spin" />
    </div>
  );
};

export const LoadingSpinnerButton = () => {
  return (
    <div className="flex items-center justify-center w-full ">
      <div className="w-6 h-6 border-t-2 border-b-2 border-purple-500 rounded-full animate-spin" />
    </div>
  );
};
