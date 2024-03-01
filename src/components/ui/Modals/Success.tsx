import { CheckCircleIcon } from "@heroicons/react/24/outline";

type SuccessProps = {
  message?: string;
};

const Success = ({ message }: SuccessProps) => {
  return (
    <div className="m-8 flex flex-col justify-center items-center font-bold">
      <CheckCircleIcon className="size-32 text-green-600" />
      <p>{message}</p>
    </div>
  );
};
export default Success;
