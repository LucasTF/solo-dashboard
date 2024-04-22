import { FileCategory } from "@/enums/FileCategory";

export function generateFileURI(
  codObra: string,
  ano: number,
  category: FileCategory
): string {
  return process.env.UPLOADED_FILES_PATH.concat(
    "/",
    generateFilePath(codObra, ano, category)
  );
}

export function generateFilePath(
  codObra: string,
  ano: number,
  category: FileCategory
): string {
  let uploadPath = `${ano}/${codObra.replaceAll("/", "-")}`;

  switch (category) {
    case FileCategory.Planta:
      uploadPath = uploadPath.concat("/plantas");
      break;
    case FileCategory.DWG:
      uploadPath = uploadPath.concat("/dwgs");
      break;
  }

  return uploadPath;
}
