from datetime import datetime
from sqlalchemy import DateTime, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column

from src.config.constants import (
    MAX_FILE_FORMAT_LENGTH,
    MAX_FILE_NAME_LENGTH,
    MAX_FILE_PATH_LENGTH,
    MAX_FILE_TYPE_LENGTH,
)
from src.models.entities.base import Base


class Arquivo(Base):
    __tablename__ = "Arquivo"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    obra_id: Mapped[int] = mapped_column(ForeignKey("Obra.id"))
    nome: Mapped[str] = mapped_column(String(MAX_FILE_NAME_LENGTH), index=True)
    formato: Mapped[str] = mapped_column(String(MAX_FILE_FORMAT_LENGTH), index=True)
    criado_em: Mapped[datetime] = mapped_column(DateTime())
    tipo: Mapped[str] = mapped_column(String(MAX_FILE_TYPE_LENGTH), index=True)
    caminho: Mapped[str] = mapped_column(String(MAX_FILE_PATH_LENGTH))

    def __repr__(self) -> str:
        return f"<Arquivo | id={self.id} | arquivo={self.caminho + self.nome} | formato={self.formato} | tipo={self.tipo} | created_at={self.criado_em.isoformat()} >"
