from typing import Optional
from typing_extensions import Annotated
from pydantic import (
    BaseModel,
    EmailStr,
    Field,
    PositiveInt,
    StrictBool,
    field_validator,
)

from src.models.entities.usuario import Usuario
from src.config.constants import (
    MAX_EMAIL_LENGTH,
    MAX_USUARIO_NAME_LENGTH,
    MAX_USUARIO_PASSWORD_LENGTH,
)
from src.validators.validator_functions import (
    validate_at_least_one_letter_and_whitespace,
)


class ValidUsuario(BaseModel):
    id: Annotated[Optional[PositiveInt], Field(default=None)]
    name: Annotated[str, Field(max_length=MAX_USUARIO_NAME_LENGTH)]
    email: Annotated[EmailStr, Field(max_length=MAX_EMAIL_LENGTH)]
    password: Annotated[
        str, Field(min_length=6, max_length=MAX_USUARIO_PASSWORD_LENGTH, exclude=True)
    ]
    is_admin: Annotated[Optional[StrictBool], Field(default=False)]

    @field_validator("name")
    @classmethod
    def name_must_contain_only_letters_and_whitespace(cls, v: str) -> str:
        return validate_at_least_one_letter_and_whitespace(v)

    @classmethod
    def serialize(cls, usuario: Usuario):
        valid_usuario = ValidUsuario(
            id=usuario.id,
            name=usuario.name,
            email=usuario.email,
            password=usuario.password,
            is_admin=usuario.is_admin,
        )

        return valid_usuario
