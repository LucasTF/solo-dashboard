from abc import abstractmethod
from dataclasses import dataclass
from datetime import date

from src.models.entities.obra import Obra


@dataclass
class ObraResponse:

    id: int
    cod_obra: str
    num_obra: int
    ano: int
    data_inicio: date
    data_fim: date
    logradouro: str
    bairro: str
    cidade: str
    uf: str
    cliente: str
    tipo_logo: str = None
    lote: str = None
    quadra: str = None
    cep: str = None
    complemento: str = None
    proprietario: str = None

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
            proprietario=proprietario
        )