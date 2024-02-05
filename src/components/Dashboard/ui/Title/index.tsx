export const DashboardTitle = ({ title }: { title: string }) => {
  return (
    <h1 className="font-bold text-4xl w-11/12 lg:w-4/5 mx-auto mb-8 text-white">
      {title}
    </h1>
  );
};
