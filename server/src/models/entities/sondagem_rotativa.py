from sqlalchemy import Float, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from src.models.entities.base import Base


class SondagemRotativa(Base):
    __tablename__ = "Sondagem_Rotativa"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    sondagens: Mapped[int] = mapped_column()
    metros_solo: Mapped[float] = mapped_column(Float(precision=2))
    metros_rocha: Mapped[float] = mapped_column(Float(precision=2))
    obra_id: Mapped[int] = mapped_column(ForeignKey("Obra.id"))
