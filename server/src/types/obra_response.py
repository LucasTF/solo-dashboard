from abc import abstractmethod
from dataclasses import dataclass
from datetime import date
from typing import Dict

from src.models.entities.obra import Obra
from src.models.entities.sondagem_percussao import SondagemPercussao
from src.models.entities.sondagem_rotativa import SondagemRotativa
from src.models.entities.sondagem_trado import SondagemTrado
from src.types.sondagem_types import (
    SondagemPercussaoType,
    SondagemRotativaType,
    SondagemTradoType,
)


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
    sondagem_percussao: SondagemPercussaoType = None
    sondagem_trado: SondagemTradoType = None
    sondagem_rotativa: SondagemRotativaType = None

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
            "proprietario": self.proprietario,
            "sondagem_percussao": self.sondagem_percussao,
            "sondagem_trado": self.sondagem_trado,
            "sondagem_rotativa": self.sondagem_rotativa,
        }

    @abstractmethod
    def serialize(
        obra: Obra,
        cliente: str,
        proprietario: str = None,
        sondagem_percussao: SondagemPercussao = None,
        sondagem_trado: SondagemTrado = None,
        sondagem_rotativa: SondagemRotativa = None,
    ):
        son_per = (
            {
                "sondagens": sondagem_percussao.sondagens,
                "metros": sondagem_percussao.metros,
            }
            if sondagem_percussao is not None
            else None
        )
        son_tra = (
            {
                "sondagens": sondagem_trado.sondagens,
                "metros": sondagem_trado.metros,
            }
            if sondagem_trado is not None
            else None
        )
        son_rot = (
            {
                "sondagens": sondagem_rotativa.sondagens,
                "metros_solo": sondagem_rotativa.metros_solo,
                "metros_rocha": sondagem_rotativa.metros_rocha,
            }
            if sondagem_rotativa is not None
            else None
        )

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
            sondagem_percussao=son_per,
            sondagem_trado=son_tra,
            sondagem_rotativa=son_rot,
        )
