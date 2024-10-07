from abc import ABC, abstractmethod
from typing import List

from src.models.entities.cliente import Cliente


class ClienteRepositoryInterface(ABC):
    @abstractmethod
    def list_clientes(self) -> List[Cliente]:
        pass

    @abstractmethod
    def get_cliente_by_id(self, id: int) -> Cliente | None:
        pass

    @abstractmethod
    def search_clientes(self, search_string: str) -> List[Cliente]:
        pass

    @abstractmethod
    def insert_cliente(
        self,
        nome: str,
        apelido: str = None,
        cpf: str = None,
        cnpj: str = None,
        tipo_logo: str = None,
        logradouro: str = None,
        complemento: str = None,
        bairro: str = None,
        cidade: str = None,
        uf: str = None,
        cep: str = None,
        email: str = None,
        fone1: int = None,
        fone2: int = None,
    ):
        pass
