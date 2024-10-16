from sqlalchemy import Float, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from src.models.entities.base import Base


class SondagemPercussao(Base):
    __tablename__ = "Sondagem_Percussao"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    sondagens: Mapped[int] = mapped_column()
    metros: Mapped[float] = mapped_column(Float(precision=2))
    obra_id: Mapped[int] = mapped_column(ForeignKey("Obra.id"))