from typing import List
from src.controllers.interfaces.arquivo_controller_interface import ArquivoControllerInterface
from src.models.interfaces.arquivo_repository_interface import ArquivoRepositoryInterface


class ArquivoController(ArquivoControllerInterface):

    def __init__(self, arquivo_repository: ArquivoRepositoryInterface):
        self.__repository = arquivo_repository

    def create(self, obra_id, arquivos) -> List[int]:
        raise NotImplementedError

    def find_by_id(self, arquivo_id):
        raise NotImplementedError

    def find_by_obra_id(self, obra_id):
        raise NotImplementedError

    def list_latest(self, num_of_arquivos = 5):
        raise NotImplementedError

    def delete(self, arquivo_id):
        raise NotImplementedError
