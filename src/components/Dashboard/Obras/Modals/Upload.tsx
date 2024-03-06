import Button from "@/components/ui/Button";
import { Obra } from "@/types/data/Obra";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, useState, useTransition } from "react";
import Loading from "@/components/ui/Loading";
import { ServerResponse } from "@/types/ServerResponse";
import { toast } from "react-toastify";

type UploadProps = {
  obra: Obra;
  closeModal: Function;
};

const Upload = ({ obra, closeModal }: UploadProps) => {
  const [fileList, setFileList] = useState<FileList | null>(null);
  const [isPending, startTransition] = useTransition();

  const files = fileList ? [...fileList] : [];

  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFileList(e.target.files);
  };

  const uploadHandler = () => {
    if (!fileList) return;
    startTransition(async () => {
      const formData = new FormData();
      files.forEach((file) => formData.append("obra-file", file, file.name));

      const res = await fetch(
        `/api/upload/${obra.id}?noWrite=${
          process.env.NODE_ENV === "development"
        }`,
        {
          method: "POST",
          body: formData,
        }
      );

      const resJson: ServerResponse = await res.json();

      if (resJson.success) {
        setFileList(null);
        toast(resJson.message, { type: "success" });
      } else {
        toast(resJson.error, { type: "error" });
      }
      closeModal();
    });
  };

  const modalBuilder = () => {
    if (isPending) return <Loading />;
    return (
      <div className="p-4">
        <div className="my-4">
          {files.length > 3 && (
            <div className="bg-red-600 p-2 rounded-md flex items-center text-white gap-x-2 mb-4">
              <ExclamationTriangleIcon className="size-6" />
              Número de arquivos deve ser menor ou igual a 3.
            </div>
          )}
          <input
            id="archives-input"
            type="file"
            onChange={(e) => fileChangeHandler(e)}
            multiple
            accept=".pdf"
            hidden
          />
          <label
            htmlFor="archives-input"
            className="flex flex-col gap-4 justify-center items-center bg-slate-300 dark:bg-zinc-700 cursor-pointer h-56 rounded-md w-full text-gray-600 dark:text-gray-400 border-slate-400 dark:border-zinc-900 border-2 border-dashed transition-colors ease-in duration-200 hover:text-black hover:border-slate-500"
          >
            <ArrowUpTrayIcon className="size-8" />
            {!fileList ? (
              <h3>Clique para selecionar arquivos a serem enviados...</h3>
            ) : (
              <ul className="text-sm">
                {files?.map((file, key) => (
                  <li key={key}>{file.name}</li>
                ))}
              </ul>
            )}
          </label>
        </div>

        <Button
          color="green"
          fontStrength="semibold"
          className="ml-auto"
          onClick={() => uploadHandler()}
          disabled={files.length === 0 || files.length > 3}
        >
          Fazer upload
        </Button>
      </div>
    );
  };

  return modalBuilder();
};

export default Upload;
