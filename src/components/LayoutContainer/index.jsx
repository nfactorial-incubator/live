export const LayoutContainer = ({ children }) => {
  return (
    <div className="grid grid-cols-6 h-screen ">
      <div className="flex flex-col gap-5 col-start-3 col-span-2">
        {children}
      </div>
    </div>
  );
};
