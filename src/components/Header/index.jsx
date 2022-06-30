export const Header = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col gap-2">
      <h5 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h5>
      <p className="font-normal text-2xl text-gray-600">{subtitle}</p>
    </div>
  );
};
