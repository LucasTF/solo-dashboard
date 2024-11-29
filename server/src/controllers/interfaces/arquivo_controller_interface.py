from abc import ABC, abstractmethod
from typing import List
from werkzeug.datastructures import FileStorage

from src.types.arquivo_response import ArquivoResponse


class ArquivoControllerInterface(ABC):
    @abstractmethod
    def create(self, obra_id: int, arquivos: List[FileStorage]) -> List[int]:
        pass

    @abstractmethod
    def find_by_id(self, arquivo_id: int) -> ArquivoResponse:
        pass

    @abstractmethod
    def find_by_obra_id(self, obra_id: int) -> List[ArquivoResponse]:
        pass

    @abstractmethod
    def list_latest(self, num_of_arquivos: int = 5) -> List[ArquivoResponse]:
        pass

    @abstractmethod
    def delete(self, arquivo_id: int) -> None:
        pass
