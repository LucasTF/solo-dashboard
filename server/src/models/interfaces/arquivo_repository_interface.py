from abc import ABC, abstractmethod
from typing import List

from src.models.entities.arquivo import Arquivo


class ArquivoRepositoryInterface(ABC):

    @abstractmethod
    def list_latest_arquivos(self, num_of_arquivos: int = 5) -> List[Arquivo]:
        pass

    @abstractmethod
    def register_arquivo(self, obra_id: int, arquivo_name: str) -> Arquivo:
        pass

    @abstractmethod
    def delete_arquivo(self, arquivo_id: int) -> None:
        pass