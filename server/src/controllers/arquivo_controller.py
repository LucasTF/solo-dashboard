import os
from typing import List
from werkzeug.utils import secure_filename

from src.controllers.interfaces.arquivo_controller_interface import (
    ArquivoControllerInterface,
)
from src.enums.file_types import FileType
from src.errors.internal_processing_error import InternalProcessingError
from src.errors.unavailable_resource_error import UnavailableResourceError
from src.models.interfaces.arquivo_repository_interface import (
    ArquivoRepositoryInterface,
)

from src.models.interfaces.obra_repository_interface import ObraRepositoryInterface
from src.services.file_service import FileService
from src.types.arquivo_response import ArquivoResponse


class ArquivoController(ArquivoControllerInterface):
    def __init__(
        self,
        arquivo_repository: ArquivoRepositoryInterface,
        obra_repository: ObraRepositoryInterface,
    ):
        self.__arquivo_repository = arquivo_repository
        self.__obra_repository = obra_repository
        self.__file_service = FileService()

    def create(self, obra_id, arquivos) -> List[int]:
        obra = self.__obra_repository.get_obra_by_id(obra_id)

        if not obra:
            raise UnavailableResourceError("Obra")

        # Validate if all files have an allowed extension, name and size
        self.__file_service.validate_files(arquivos)

        saved_files: List[str] = []
        registered_files: List[int] = []

        try:
            for arquivo in arquivos:
                # Secure filename
                filename = secure_filename(arquivo.filename)

                # Construct path for the new file
                path = self.__file_service.contruct_path(
                    arquivo.filename,
                    obra.ano,
                    obra.cod_obra,
                    FileType.Planta,
                    True,
                    True,
                )

                # Validate paths existence
                save_path = self.__file_service.contruct_path(
                    arquivo.filename,
                    obra.ano,
                    obra.cod_obra,
                    FileType.Planta,
                    True,
                    False,
                )
                if not os.path.exists(save_path):
                    os.makedirs(save_path)

                # Save file to disk
                arquivo.save(path)
                saved_files.append(path)

                # Register file to DB
                inserted_id = self.__arquivo_repository.register_arquivo(
                    obra_id,
                    {
                        "nome": filename,
                        "formato": filename.split(".").pop().upper(),
                        "caminho": self.__file_service.contruct_path(
                            arquivo.filename, obra.ano, obra.cod_obra, FileType.Planta
                        ),
                        "tipo": FileType.Planta.name,
                    },
                )
                registered_files.append(inserted_id)
        except Exception as exc:
            print(exc)

            # Revert changes to previous state
            for arquivo_id in registered_files:
                self.__arquivo_repository.delete_arquivo(arquivo_id)

            for saved_file_path in saved_files:
                os.remove(saved_file_path)

            raise InternalProcessingError

        return registered_files

    def find_by_id(self, arquivo_id):
        arquivo = self.__arquivo_repository.find_arquivo_by_id(arquivo_id)

        arquivo_response = ArquivoResponse(
            id=arquivo.id,
            nome=arquivo.nome,
            obra_id=arquivo.obra_id,
            criado_em=arquivo.criado_em,
            tipo=arquivo.tipo,
            link="/".join([arquivo.caminho, arquivo.nome]),
        )

        return arquivo_response

    def find_by_obra_id(self, obra_id):
        arquivos = self.__arquivo_repository.find_arquivos_by_obra_id(obra_id)

        arquivos_response: List[ArquivoResponse] = []

        for arquivo in arquivos:
            arquivos_response.append(
                ArquivoResponse(
                    id=arquivo.id,
                    nome=arquivo.nome,
                    obra_id=arquivo.obra_id,
                    criado_em=arquivo.criado_em,
                    tipo=arquivo.tipo,
                    link="/".join([arquivo.caminho, arquivo.nome]),
                )
            )

        return arquivos_response

    def list_latest(self, num_of_arquivos=5):
        arquivos = self.__arquivo_repository.list_latest_arquivos(num_of_arquivos)

        arquivos_response: List[ArquivoResponse] = []

        for arquivo in arquivos:
            arquivos_response.append(
                ArquivoResponse(
                    id=arquivo.id,
                    nome=arquivo.nome,
                    obra_id=arquivo.obra_id,
                    criado_em=arquivo.criado_em,
                    tipo=arquivo.tipo,
                    link="/".join([arquivo.caminho, arquivo.nome]),
                )
            )

        return arquivos_response

    def delete(self, arquivo_id):
        self.__arquivo_repository.delete_arquivo(arquivo_id)

    def list_total(self):
        return self.__arquivo_repository.count_arquivos()

