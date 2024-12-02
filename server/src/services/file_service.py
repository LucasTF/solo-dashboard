import os
from typing import List, Set
from werkzeug.datastructures import FileStorage
from werkzeug.utils import secure_filename

from src.config.environment import files_env
from src.config.constants import MAX_FILE_NAME_LENGTH
from src.enums.file_types import FileType
from src.errors.invalid_request_body_error import InvalidRequestBodyError


class FileService:
    __ALLOWED_EXTENSIONS = {"pdf"}

    def has_valid_extension(
        self, filename: str, allowed_extensions: Set[str] = None
    ) -> bool:
        extensions = allowed_extensions or self.__ALLOWED_EXTENSIONS
        return "." in filename and filename.rsplit(".", 1)[1].lower() in extensions

    def has_valid_name_size(self, filename: str) -> bool:
        return len(filename) <= MAX_FILE_NAME_LENGTH

    def contruct_path(
        self,
        filename: str,
        ano_obra: int,
        cod_obra: str,
        file_type: FileType,
        include_base_path: bool = False,
        include_file: bool = False,
    ) -> str:
        base_path = files_env.get("UPLOADED_FILES_PATH")
        cod_obra_path = cod_obra.replace("/", "-")
        file_type_path = file_type.value
        safe_filename = secure_filename(filename)

        file_path = os.path.join(str(ano_obra), cod_obra_path, file_type_path)

        if include_base_path:
            file_path = os.path.join(base_path, file_path)

        if include_file:
            file_path = os.path.join(file_path, safe_filename)

        return str(file_path)

    def validate_files(self, arquivos: List[FileStorage]) -> None:
        for arquivo in arquivos:
            filename = secure_filename(arquivo.filename)

            if not self.has_valid_extension(filename) or not self.has_valid_name_size(
                filename
            ):
                raise InvalidRequestBodyError
