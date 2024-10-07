from abc import ABC, abstractmethod
from typing import Dict, List

from src.models.entities.cliente import Cliente


class ClienteControllerInterface(ABC):
    @abstractmethod
    def create(self, cliente_info: Dict) -> None:
        pass

    @abstractmethod
    def find_by_id(self, cliente_id: int) -> Cliente:
        pass

    @abstractmethod
    def list(self) -> List[Cliente]:
        pass

    @abstractmethod
    def search(self, search_string: str) -> List[Cliente]:
        pass
