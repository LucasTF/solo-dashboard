from datetime import date
from typing import Optional
from typing_extensions import Annotated
from pydantic import BaseModel, Field, PositiveInt, field_validator, model_validator

from src.config.constants import (
    CEP_LENGTH,
    MAX_BAIRRO_LENGTH,
    MAX_CIDADE_LENGTH,
    MAX_COD_OBRA_LENGTH,
    MAX_COMPLEMENTO_LOGO_LENGTH,
    MAX_LOGRADOURO_LENGTH,
    MAX_LOTE_LENGTH,
    MAX_QUADRA_LENGTH,
    MAX_TIPO_LOGO_LENGTH,
    UF_LENGTH,
)
from src.models.entities.obra import Obra
from src.validators.validator_functions import (
    validate_cep,
    validate_tipo_logo,
    validate_uf,
)


class ValidObra(BaseModel):
    id: Annotated[Optional[PositiveInt], Field(default=None)]
    cod_obra: Annotated[str, Field(max_length=MAX_COD_OBRA_LENGTH)]
    num_obra: Annotated[PositiveInt, Field()]
    ano: Annotated[PositiveInt, Field()]
    data_inicio: Annotated[date, Field()]
    data_fim: Annotated[date, Field()]
    tipo_logo: Annotated[
        Optional[str], Field(max_length=MAX_TIPO_LOGO_LENGTH, default=None)
    ]
    logradouro: Annotated[str, Field(max_length=MAX_LOGRADOURO_LENGTH)]
    lote: Annotated[Optional[str], Field(max_length=MAX_LOTE_LENGTH, default=None)]
    quadra: Annotated[Optional[str], Field(max_length=MAX_QUADRA_LENGTH, default=None)]
    bairro: Annotated[str, Field(max_length=MAX_BAIRRO_LENGTH)]
    cidade: Annotated[str, Field(max_length=MAX_CIDADE_LENGTH)]
    uf: Annotated[str, Field(min_length=UF_LENGTH, max_length=UF_LENGTH)]
    cep: Annotated[
        Optional[str], Field(min_length=CEP_LENGTH, max_length=CEP_LENGTH, default=None)
    ]
    complemento: Annotated[
        Optional[str], Field(max_length=MAX_COMPLEMENTO_LOGO_LENGTH, default=None)
    ]

    @model_validator(mode="after")
    def validate_dates(self):
        data_inicio = self.data_inicio.isoformat()
        data_fim = self.data_fim.isoformat()

        if data_inicio > data_fim:
            raise ValueError(
                "Data de conclusão da obra não pode ser anterior a data de início."
            )

        return self

    @field_validator("tipo_logo")
    @classmethod
    def tipo_logo_format(cls, v: str | None) -> str | None:
        if v is None:
            return v

        return validate_tipo_logo(v)

    @field_validator("uf")
    @classmethod
    def uf_format(cls, v: str | None) -> str | None:
        if v is None:
            return v

        return validate_uf(v)

    @field_validator("cep")
    @classmethod
    def cep_format(cls, v: str | None) -> str | None:
        if v is None:
            return v

        return validate_cep(v)

    @classmethod
    def serialize(cls, obra: Obra):
        valid_obra = ValidObra(
            id=obra.id,
            cod_obra=obra.cod_obra,
            num_obra=obra.num_obra,
            ano=obra.ano,
            data_inicio=obra.data_inicio,
            data_fim=obra.data_fim,
            tipo_logo=obra.tipo_logo,
            logradouro=obra.logradouro,
            lote=obra.lote,
            quadra=obra.quadra,
            bairro=obra.bairro,
            cidade=obra.cidade,
            uf=obra.uf,
            cep=obra.cep,
            complemento=obra.complemento,
        )

        return valid_obra
