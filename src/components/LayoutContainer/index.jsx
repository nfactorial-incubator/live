export const LayoutContainer = ({ children }) => {
  return (
    <div className="grid grid-cols-4 h-screen ">
      <div className="flex flex-col gap-5 col-start-2 col-span-2">
        {children}
      </div>
    </div>
  );
};
