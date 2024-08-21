import regex
from typing import Optional
from typing_extensions import Annotated
from pydantic import BaseModel, EmailStr, Field, PositiveInt, StrictBool, field_validator

from src.utils.constants import MAX_USUARIO_EMAIL_LENGTH, MAX_USUARIO_NAME_LENGTH, MAX_USUARIO_PASSWORD_LENGTH

class SerialUsuario(BaseModel):

    id: Annotated[Optional[PositiveInt], Field(default=None)]
    name: Annotated[str, Field(max_length=MAX_USUARIO_NAME_LENGTH)]
    email: Annotated[EmailStr, Field(max_length=MAX_USUARIO_EMAIL_LENGTH)]
    password: Annotated[str, Field(min_length=6, max_length=MAX_USUARIO_PASSWORD_LENGTH)]
    is_admin: Annotated[Optional[StrictBool], Field(default=False)]

    @field_validator('name')
    @classmethod
    def name_must_contain_only_letters_and_whitespace(cls, v: str) -> str:
        # Regular expression pattern to check if the string contains only letters (including diacritics) and whitespace
        # and contains at least one letter.
        pattern = r'^(?=.*\p{L})[\p{L}\s]+$'

        if bool(regex.match(pattern, v)):
            return v
        
        raise ValueError('Name must have, at least, one letter and contain only letters and whitespaces.')
