from abc import ABC, abstractmethod
from typing import List

from src.models.entities.arquivo import Arquivo
from src.types.arquivo_types import ArquivoInsertType


class ArquivoRepositoryInterface(ABC):
    @abstractmethod
    def list_latest_arquivos(self, num_of_arquivos: int = 5) -> List[Arquivo]:
        pass

    @abstractmethod
    def register_arquivo(
        self,
        obra_id: int,
        arquivo_info: ArquivoInsertType
    ) -> Arquivo:
        pass

    @abstractmethod
    def delete_arquivo(self, arquivo_id: int) -> None:
        pass
