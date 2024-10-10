from abc import abstractmethod
from dataclasses import dataclass
from datetime import date
from typing import Dict

from src.models.entities.obra import Obra


@dataclass
class ObraResponse:
    id: int
    cod_obra: str
    num_obra: int
    ano: int
    data_inicio: date
    data_fim: date
    cidade: str
    uf: str
    logradouro: str
    bairro: str
    cliente: str
    tipo_logo: str = None
    complemento: str = None
    lote: str = None
    quadra: str = None
    cep: str = None
    proprietario: str = None

    def to_dict(self) -> Dict:
        return {
            "id": self.id,
            "cod_obra": self.cod_obra,
            "num_obra": self.num_obra,
            "ano": self.ano,
            "data_inicio": self.data_inicio.isoformat(),
            "data_fim": self.data_fim.isoformat(),
            "cidade": self.cidade,
            "uf": self.uf,
            "tipo_logo": self.tipo_logo,
            "logradouro": self.logradouro,
            "complemento": self.complemento,
            "bairro": self.bairro,
            "cep": self.cep,
            "lote": self.lote,
            "quadra": self.quadra,
            "cliente": self.cliente,
            "proprietario": self.proprietario
        }

    @abstractmethod
    def serialize(obra: Obra, cliente: str, proprietario: str = None):
        return ObraResponse(
            id=obra.id,
            cod_obra=obra.cod_obra,
            num_obra=obra.num_obra,
            ano=obra.ano,
            data_inicio=obra.data_inicio,
            data_fim=obra.data_fim,
            logradouro=obra.logradouro,
            bairro=obra.bairro,
            cidade=obra.cidade,
            uf=obra.uf,
            cliente=cliente,
            tipo_logo=obra.tipo_logo,
            lote=obra.lote,
            quadra=obra.quadra,
            cep=obra.cep,
            complemento=obra.complemento,
            proprietario=proprietario,
        )
