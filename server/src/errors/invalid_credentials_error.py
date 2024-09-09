from src.errors.base_error import BaseError

class InvalidCredentialsError(BaseError):

    def __init__(self) -> None:
        title = "Erro ao fazer a autenticação."
        description = "Email ou senha inválida(s)."
        code = 400
        super().__init__(title, description, code)