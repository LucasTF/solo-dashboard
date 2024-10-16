from datetime import date
from typing import NotRequired, TypedDict


class ObraInsertType(TypedDict):
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
    tipo_logo: NotRequired[str]
    complemento: NotRequired[str]
    lote: NotRequired[str]
    quadra: NotRequired[str]
    cep: NotRequired[str]
    proprietario: NotRequired[str]


class ObraEditType(TypedDict, total=False):
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
    tipo_logo: str
    complemento: str
    lote: str
    quadra: str
    cep: str
    proprietario: str
