from sqlalchemy import Boolean, String, false
from sqlalchemy.orm import Mapped, mapped_column

from src.models.entities.base import Base
from src.utils.constants import MAX_USUARIO_EMAIL_LENGTH, MAX_USUARIO_NAME_LENGTH, MAX_USUARIO_PASSWORD_LENGTH

class Usuario(Base):
    __tablename__ = 'Usuario'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(MAX_USUARIO_NAME_LENGTH), index=True)
    email: Mapped[str] = mapped_column(String(MAX_USUARIO_EMAIL_LENGTH), unique=True, index=True)
    password: Mapped[str] = mapped_column(String(MAX_USUARIO_PASSWORD_LENGTH))
    is_admin: Mapped[bool] = mapped_column(Boolean(), server_default=false())

    def __repr__(self) -> str:
        return f"<Usuario | id={self.id} | name={self.name} | email={self.email} | is_admin={self.is_admin}>"