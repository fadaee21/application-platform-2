const EmptyData = ({ text }: { text: string }) => {
  return (
    <div className="m-5 py-28 rounded shadow-md bg-slate-50 dark:bg-slate-700">
      <p className="flex justify-center items-center  text-xl">
        {text}
      </p>
    </div>
  );
};

export default EmptyData;
