import Spinner from "@/components/ui/Spinner";

const Loading = () => {
  return (
    <div className="m-8 flex items-center justify-center">
      <Spinner size="md" />
    </div>
  );
};

export default Loading;
