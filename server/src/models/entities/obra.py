from datetime import date
from typing import Optional
from sqlalchemy import CHAR, Date, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column

from src.config.constants import CEP_LENGTH, MAX_BAIRRO_LENGTH, MAX_CIDADE_LENGTH, MAX_COD_OBRA_LENGTH, MAX_COMPLEMENTO_LOGO_LENGTH, MAX_LOGRADOURO_LENGTH, MAX_LOTE_LENGTH, MAX_QUADRA_LENGTH, MAX_TIPO_LOGO_LENGTH, UF_LENGTH
from src.models.entities.base import Base


class Obra(Base):
    __tablename__ = 'Obra'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    cod_obra: Mapped[str] = mapped_column(String(MAX_COD_OBRA_LENGTH), index=True, unique=True)
    num_obra: Mapped[int] = mapped_column(index=True)
    ano: Mapped[int] = mapped_column(index=True)
    data_inicio: Mapped[date] = mapped_column(Date(), index=True)
    data_fim: Mapped[date] = mapped_column(Date(), index=True)
    tipo_logo: Mapped[Optional[str]] = mapped_column(String(MAX_TIPO_LOGO_LENGTH)) # Optional for compatibility reasons
    logradouro: Mapped[str] = mapped_column(String(MAX_LOGRADOURO_LENGTH), index=True)
    lote: Mapped[Optional[str]] = mapped_column(String(MAX_LOTE_LENGTH))
    quadra: Mapped[Optional[str]] = mapped_column(String(MAX_QUADRA_LENGTH))
    bairro: Mapped[str] = mapped_column(String(MAX_BAIRRO_LENGTH), index=True)
    cidade: Mapped[str] = mapped_column(String(MAX_CIDADE_LENGTH), index=True)
    uf: Mapped[str] = mapped_column(CHAR(UF_LENGTH), index=True)
    cep: Mapped[Optional[str]] = mapped_column(CHAR(CEP_LENGTH))
    complemento: Mapped[Optional[str]] = mapped_column(String(MAX_COMPLEMENTO_LOGO_LENGTH), index=True)
    cliente_id: Mapped[int] = mapped_column(ForeignKey("Cliente.id"))
    proprietario_id: Mapped[Optional[int]] = mapped_column(ForeignKey("Cliente.id"))
    
    def __repr__(self) -> str:
        return f"<Obra | id={self.id} | cod_obra={self.cod_obra} | ano={self.ano} | data_inicio={self.data_inicio} | data_fim={self.data_fim} | logradouro={self.tipo_logo + " " + self.logradouro}>"


