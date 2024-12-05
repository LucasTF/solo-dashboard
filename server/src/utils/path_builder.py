import os
from typing import List

from werkzeug.utils import secure_filename

from src.config.constants import MAX_FILE_NAME_LENGTH
from src.config.environment import files_env

class PathBuilder:

    def __init__(self, directories: List[str], filename: str, base_path: str = None, allowed_extensions: set[str] = None):
        self.__base_path = base_path or files_env.get("UPLOADED_FILES_PATH")
        self.__allowed_extensions = allowed_extensions
        self.__directories = directories
        self.__filename = secure_filename(filename)

    def __has_valid_extension(
        self
    ) -> bool:
        if self.__allowed_extensions:
            return "." in self.__filename and self.__filename.rsplit(".", 1)[1].lower() in self.__allowed_extensions
        
        return True

    def __has_valid_name_size(self) -> bool:
        return len(self.__filename) > 0 and len(self.__filename) <= MAX_FILE_NAME_LENGTH

    def build_path(
        self,
        include_base_path: bool = True,
        include_file: bool = True,
    ) -> str:
        
        if not self.__has_valid_name_size():
            raise ValueError(f"Nome do arquivo deve ser igual ou inferior a {MAX_FILE_NAME_LENGTH}.")
        
        if not self.__has_valid_extension():
            raise ValueError(f"Somente as seguintes extensões são permitidas: {", ".join(self.__allowed_extensions)}")
        
        file_path = ""

        for directory in self.__directories:
            sanitized_directory = directory.replace("/", "-")
            sanitized_directory = secure_filename(sanitized_directory)

            file_path = os.path.join(file_path, sanitized_directory)

        if include_base_path:
            file_path = os.path.join(self.__base_path, file_path)

        if include_file:
            file_path = os.path.join(file_path, self.__filename)

        return str(file_path)