from datetime import date
from typing import NotRequired, TypedDict

from src.types.sondagem_types import (
    SondagemPercussaoType,
    SondagemRotativaType,
    SondagemTradoType,
)


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
    sondagem_percussao: NotRequired[SondagemPercussaoType]
    sondagem_trado: NotRequired[SondagemTradoType]
    sondagagem_rotativa: NotRequired[SondagemRotativaType]


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
    sondagem_percussao: NotRequired[SondagemPercussaoType]
    sondagem_trado: NotRequired[SondagemTradoType]
    sondagagem_rotativa: NotRequired[SondagemRotativaType]
