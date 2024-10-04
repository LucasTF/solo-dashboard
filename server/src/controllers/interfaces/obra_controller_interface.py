from abc import ABC, abstractmethod
from typing import Dict, List

from src.models.entities.obra import Obra


class ObraControllerInterface(ABC):

    @abstractmethod
    def create(self, obra_info: Dict) -> None:
        pass

    @abstractmethod
    def find_by_id(self, obra_id: int) -> Obra:
        pass

    @abstractmethod
    def find_by_cod(self, obra_cod: int) -> Obra:
        pass

    @abstractmethod
    def list(self) -> List[Obra]:
        pass

    @abstractmethod
    def update(self, obra_id: int, obra_info: Dict) -> None:
        pass

    @abstractmethod
    def search(self, search_string: str) -> List[Obra]:
        pass