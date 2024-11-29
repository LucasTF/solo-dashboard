import { ChangeEvent, useState, useTransition } from "react";
import { toast } from "react-toastify";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

import { EntryObra } from "@/types/data/Obra";
import { DataResponse } from "@/types/ServerResponse";
import { FileCategory } from "@/enums/FileCategory";

import { useEntryStore } from "@/lib/stores/entry";
import Button from "@/components/ui/Button";
import Loading from "@/components/ui/Loading";
import { Table } from "@/components/Table";
import { TrashIcon } from "@heroicons/react/24/solid";

type UploadedFile = {
  file: File;
  category: FileCategory;
};

type UploadProps = {
  obra: EntryObra;
  closeModal: Function;
};

const Upload = ({ obra, closeModal }: UploadProps) => {
  const [fileList, setFileList] = useState<UploadedFile[]>([]);
  const [isPending, startTransition] = useTransition();

  const { refreshEntry } = useEntryStore();

  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFileList: UploadedFile[] = [];
      Array.from(e.target.files).forEach((file) =>
        newFileList.push({ file, category: FileCategory.Planta })
      );
      setFileList(newFileList);
    }
  };

  const uploadHandler = () => {
    if (!fileList) return;
    startTransition(async () => {
      const formData = new FormData();
      fileList.forEach((entry) => {
        formData.append("files[]", entry.file, entry.file.name);
        formData.append(`file-category`, entry.category);
      });

      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URI + `/arquivos/${obra.id}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (res.ok) {
        refreshEntry();
        setFileList([]);
        toast("Arquivo salvo com sucesso.", { type: "success" });
      } else {
        toast("Erro! Arquivo não salvo.", { type: "error" });
      }

      // const resJson: DataResponse<any[]> = await res.json(); // TODO: Replace 'any' with File Type

      closeModal();
    });
  };

  const changeCategoryHandler = (
    e: ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const updatedFileList = fileList.map((entry, key) => {
      if (key === index)
        return { file: entry.file, category: e.target.value as FileCategory };

      return entry;
    });

    setFileList(updatedFileList);
  };

  const modalBuilder = () => {
    if (isPending) return <Loading />;
    return (
      <div className="p-4">
        <div className="my-4">
          {fileList.length > 3 && (
            <div className="bg-red-600 p-2 rounded-md flex items-center text-white gap-x-2 mb-4">
              <ExclamationTriangleIcon className="size-6" />
              Número de arquivos deve ser menor ou igual a 3.
            </div>
          )}

          {fileList.length > 0 && (
            <section className="my-4">
              <Table.Base columns={["Arquivo", "Tipo", "Opções"]}>
                {fileList.map((entry, index) => {
                  return (
                    <Table.Row key={index}>
                      <Table.Cell>{entry.file.name}</Table.Cell>
                      <Table.Cell>
                        <select
                          name="tipo"
                          id="tipo-file"
                          className="w-full h-full p-2 rounded-md"
                          value={fileList[index].category}
                          onChange={(e) => changeCategoryHandler(e, index)}
                        >
                          {Object.values(FileCategory)
                            .filter((v) => isNaN(Number(v)))
                            .map((fcat) => {
                              const indexFcat = Object.values(
                                FileCategory
                              ).indexOf(fcat as unknown as FileCategory);
                              return (
                                <option key={indexFcat} value={fcat}>
                                  {fcat}
                                </option>
                              );
                            })}
                        </select>
                      </Table.Cell>
                      <Table.Cell>
                        <TrashIcon className="size-5 text-red-600 cursor-pointer" />
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Base>
            </section>
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
            {fileList.length === 0 ? (
              <h3>Clique para selecionar arquivos a serem enviados...</h3>
            ) : (
              <ul className="text-sm">
                {fileList.map((entry, key) => (
                  <li key={key}>{entry.file.name}</li>
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
          disabled={fileList.length === 0 || fileList.length > 3}
        >
          Fazer upload
        </Button>
      </div>
    );
  };

  return modalBuilder();
};

export default Upload;
