import os
from typing import List

from werkzeug.utils import secure_filename

from src.config.environment import files_env

class PathBuilder:

    def __init__(self, directories: List[str], filename: str, base_path: str = None):
        self.__base_path = base_path or files_env.get("UPLOADED_FILES_PATH")
        self.__directories = directories
        self.__filename = secure_filename(filename)

    def build_path(
        self,
        include_base_path: bool = True,
        include_file: bool = True,
    ) -> str:
        
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