from abc import ABC, abstractmethod
from typing import List

from src.models.entities.arquivo import Arquivo
from src.types.arquivo_types import ArquivoInsertType


class ArquivoRepositoryInterface(ABC):
    @abstractmethod
    def list_latest_arquivos(self, num_of_arquivos: int = 5) -> List[Arquivo]:
        pass

    @abstractmethod
    def find_arquivo_by_id(self, arquivo_id: int) -> Arquivo:
        pass

    @abstractmethod
    def find_arquivos_by_obra_id(self, obra_id: int) -> List[Arquivo]:
        pass

    @abstractmethod
    def register_arquivo(self, obra_id: int, arquivo_info: ArquivoInsertType) -> int:
        pass

    @abstractmethod
    def delete_arquivo(self, arquivo_id: int) -> None:
        pass

    @abstractmethod
    def count_arquivos(self) -> int:
        pass
