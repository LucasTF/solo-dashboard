from abc import ABC, abstractmethod
from typing import Dict, List

from src.types.obra_response import ObraResponse
from src.types.obra_types import ObraInsertType


class ObraControllerInterface(ABC):
    @abstractmethod
    def create(self, obra_info: ObraInsertType) -> int:
        pass

    @abstractmethod
    def find_by_id(self, obra_id: int) -> ObraResponse:
        pass

    @abstractmethod
    def find_by_cod(self, obra_cod: int) -> ObraResponse:
        pass

    @abstractmethod
    def list(self) -> List[ObraResponse]:
        pass

    @abstractmethod
    def update(self, obra_id: int, obra_info: Dict) -> None:
        pass

    @abstractmethod
    def search(self, search_string: str) -> List[ObraResponse]:
        pass
