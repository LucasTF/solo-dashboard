from abc import ABC, abstractmethod
from typing import List

from src.models.entities.usuario import Usuario

class UsuarioRepositoryInterface(ABC):

    @abstractmethod
    def list_usuarios(self) -> List[Usuario]:
        pass

    @abstractmethod
    def get_usuario_by_id(self, id: int) -> Usuario:
        pass

    @abstractmethod
    def get_usuario_by_email(self, email: str) -> Usuario:
        pass

    @abstractmethod
    def search_usuarios(self, search_string: str) -> List[Usuario]:
        pass

    @abstractmethod
    def delete_usuario(self, id: int) -> None:
        pass

    @abstractmethod
    def insert_usuario(self, name: str, email: str, password: str, is_admin: bool = False) -> None:
        pass