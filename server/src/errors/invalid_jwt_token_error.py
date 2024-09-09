from src.errors.base_error import BaseError

class InvalidJwtTokenError(BaseError):

    def __init__(self) -> None:
        title = "Token JWT inválido."
        description = "O token JWT informado não é válido."
        code = 400
        super().__init__(title, description, code)