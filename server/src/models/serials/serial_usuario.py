import regex
from typing import Optional
from typing_extensions import Annotated
from pydantic import BaseModel, EmailStr, Field, PositiveInt, StrictBool, field_validator

from src.models.entities.usuario import Usuario
from src.config.constants import MAX_USUARIO_EMAIL_LENGTH, MAX_USUARIO_NAME_LENGTH, MAX_USUARIO_PASSWORD_LENGTH

class SerialUsuario(BaseModel):

    id: Annotated[Optional[PositiveInt], Field(default=None)]
    name: Annotated[str, Field(max_length=MAX_USUARIO_NAME_LENGTH)]
    email: Annotated[EmailStr, Field(max_length=MAX_USUARIO_EMAIL_LENGTH)]
    password: Annotated[str, Field(min_length=6, max_length=MAX_USUARIO_PASSWORD_LENGTH, exclude=True)]
    is_admin: Annotated[Optional[StrictBool], Field(default=False)]

    @field_validator('name')
    @classmethod
    def name_must_contain_only_letters_and_whitespace(cls, v: str) -> str:
        # Regular expression pattern to check if the string contains only letters (including diacritics) and whitespace
        # and contains at least one letter.
        pattern = r'^(?=.*\p{L})[\p{L}\s]+$'

        if bool(regex.match(pattern, v)):
            return v
        
        raise ValueError("Nome deve conter, pelo menos, uma letra e deve conter apenas letras e espaços.")
    
    @classmethod
    def serialize(cls, usuario: Usuario):
        serial_usuario = SerialUsuario(
            id=usuario.id,
            name=usuario.name,
            email=usuario.email,
            password=usuario.password,
            is_admin=usuario.is_admin
        )

        return serial_usuario
