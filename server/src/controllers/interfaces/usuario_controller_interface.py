from abc import ABC, abstractmethod
from typing import Dict, List

from src.models.entities.usuario import Usuario

class UsuarioControllerInterface(ABC):

    @abstractmethod
    def create(self, user_info: Dict) -> None:
        pass

    @abstractmethod
    def find_by_id(self, user_id: int) -> Usuario:
        pass

    @abstractmethod
    def find_by_email(self, user_email: str) -> Usuario:
        pass

    @abstractmethod
    def list(self) -> List[Usuario]:
        pass

    @abstractmethod
    def delete(self, user_id: int) -> None:
        pass

    @abstractmethod
    def update_password(self, user_id: int, new_password: str) -> None:
        pass

    @abstractmethod
    def update(self, user_id: int, user_info: Dict) -> None:
        pass

    @abstractmethod
    def search(self, search_string: str) -> List[Usuario]:
        pass