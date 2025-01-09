from abc import ABC, abstractmethod
from typing import List

from src.types.obra_response import ObraResponse
from src.types.obra_types import ObraEditType, ObraInsertType


class ObraRepositoryInterface(ABC):
    @abstractmethod
    def list_obras(self) -> List[ObraResponse]:
        pass

    @abstractmethod
    def get_obra_by_id(self, id: int) -> ObraResponse | None:
        pass

    @abstractmethod
    def get_obra_by_cod(self, cod_obra: str) -> ObraResponse | None:
        pass

    @abstractmethod
    def search_obras(self, search_string: str) -> List[ObraResponse]:
        pass

    @abstractmethod
    def update_obra(self, id: int, update_info: ObraEditType) -> None:
        pass

    @abstractmethod
    def insert_obra(
        self,
        obra_info: ObraInsertType,
    ) -> int:
        pass

    @abstractmethod
    def count_obras(self) -> int:
        pass
