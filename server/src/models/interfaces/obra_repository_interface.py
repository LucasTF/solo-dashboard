from abc import ABC, abstractmethod
from typing import List

from src.models.entities.obra import Obra


class ObraRepositoryInterface(ABC):

    @abstractmethod
    def list_obras(self) -> List[Obra]:
        pass

    @abstractmethod
    def get_obra_by_id(self, id: int) -> Obra | None:
        pass

    @abstractmethod
    def get_obra_by_cod(self, cod_obra: str) -> Obra | None:
        pass

    @abstractmethod
    def search_obra(self, search_string: str) -> List[Obra]:
        pass

    @abstractmethod
    def update_obra(self, 
                    id: int, 
                    ano: str = None, 
                    data_inicio: str = None,
                    data_fim: str = None, 
                    tipo_logo: str = None, 
                    logradouro: str = None, 
                    lote: str = None, 
                    quadra: str = None, 
                    bairro: str = None, 
                    cidade: str = None, 
                    uf: str = None, 
                    cep: str = None, 
                    complemento: str = None,
                    cliente_id: int = None,
                    proprietario_id: int = None,
                    ) -> None:
        pass

    @abstractmethod
    def insert_obra(self,
                    cod_obra: str,
                    num_obra: str,
                    ano: str, 
                    data_inicio: str,
                    data_fim: str, 
                    uf: str, 
                    cidade: str, 
                    bairro: str, 
                    logradouro: str, 
                    cliente_id: int,
                    tipo_logo: str = None, 
                    lote: str = None, 
                    quadra: str = None, 
                    cep: str = None, 
                    complemento: str = None,
                    proprietario_id: int = None,
                    ) -> None:
        pass