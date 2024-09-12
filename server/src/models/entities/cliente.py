from typing import Optional
from sqlalchemy import String, CHAR
from sqlalchemy.orm import Mapped, mapped_column

from src.config.constants import CEP_LENGTH, MAX_EMAIL_LENGTH, MAX_BAIRRO_LENGTH, MAX_CIDADE_LENGTH, MAX_CLIENTE_NAME_LENGTH, MAX_CLIENTE_APELIDO_LENGTH, CPF_LENGTH, CNPJ_LENGTH, MAX_TIPO_LOGO_LENGTH, MAX_LOGRADOURO_LENGTH, MAX_COMPLEMENTO_LOGO_LENGTH, UF_LENGTH
from src.models.entities.base import Base

class Cliente(Base):
    __tablename__ = 'Cliente'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    nome: Mapped[str] = mapped_column(String(MAX_CLIENTE_NAME_LENGTH), index=True)
    apelido: Mapped[Optional[str]] = mapped_column(String(MAX_CLIENTE_APELIDO_LENGTH))
    cpf: Mapped[Optional[str]] = mapped_column(String(CPF_LENGTH), index=True)
    cnpj: Mapped[Optional[str]] = mapped_column(String(CNPJ_LENGTH), index=True)
    tipo_logo: Mapped[Optional[str]] = mapped_column(String(MAX_TIPO_LOGO_LENGTH))
    logradouro: Mapped[Optional[str]] = mapped_column(String(MAX_LOGRADOURO_LENGTH), index=True)
    complemento: Mapped[Optional[str]] = mapped_column(String(MAX_COMPLEMENTO_LOGO_LENGTH))
    bairro: Mapped[Optional[str]] = mapped_column(String(MAX_BAIRRO_LENGTH))
    cidade: Mapped[Optional[str]] = mapped_column(String(MAX_CIDADE_LENGTH))
    uf: Mapped[Optional[str]] = mapped_column(CHAR(UF_LENGTH))
    cep: Mapped[Optional[str]] = mapped_column(CHAR(CEP_LENGTH), index=True)
    email: Mapped[Optional[str]] = mapped_column(String(MAX_EMAIL_LENGTH), index=True)
    fone1: Mapped[Optional[int]] = mapped_column()
    fone2: Mapped[Optional[int]] = mapped_column()

