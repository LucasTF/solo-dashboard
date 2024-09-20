from typing import Optional
from typing_extensions import Annotated
from pydantic import BaseModel, EmailStr, Field, PositiveInt

from src.config.constants import CEP_LENGTH, CNPJ_LENGTH, CPF_LENGTH, MAX_BAIRRO_LENGTH, MAX_CIDADE_LENGTH, MAX_CLIENTE_APELIDO_LENGTH, MAX_CLIENTE_NAME_LENGTH, MAX_COMPLEMENTO_LOGO_LENGTH, MAX_EMAIL_LENGTH, MAX_LOGRADOURO_LENGTH, MAX_TIPO_LOGO_LENGTH, UF_LENGTH


class SerialCliente(BaseModel):

    id: Annotated[Optional[PositiveInt], Field(default=None)]
    nome: Annotated[str, Field(max_length=MAX_CLIENTE_NAME_LENGTH)]
    apelido: Annotated[Optional[str], Field(max_length=MAX_CLIENTE_APELIDO_LENGTH, default=None)]
    cpf: Annotated[Optional[str], Field(max_length=CPF_LENGTH, default=None)]
    cnpj: Annotated[Optional[str], Field(max_length=CNPJ_LENGTH, default=None)]
    tipo_logo: Annotated[Optional[str], Field(max_length=MAX_TIPO_LOGO_LENGTH, default=None)]
    logradouro: Annotated[Optional[str], Field(max_length=MAX_LOGRADOURO_LENGTH, default=None)]
    complemento: Annotated[Optional[str], Field(max_length=MAX_COMPLEMENTO_LOGO_LENGTH, default=None)]
    bairro: Annotated[Optional[str], Field(max_length=MAX_BAIRRO_LENGTH, default=None)]
    cidade: Annotated[Optional[str], Field(max_length=MAX_CIDADE_LENGTH, default=None)]
    uf: Annotated[Optional[str], Field(min_length=UF_LENGTH, max_length=UF_LENGTH, default=None)]
    cep: Annotated[Optional[str], Field(min_length=CEP_LENGTH, max_length=CEP_LENGTH, default=None)]
    email: Annotated[Optional[EmailStr], Field(max_length=MAX_EMAIL_LENGTH, default=None)]
    fone1: Annotated[Optional[PositiveInt], Field(default=None)]
    fone2: Annotated[Optional[PositiveInt], Field(default=None)]
