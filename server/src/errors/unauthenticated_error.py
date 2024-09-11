from src.errors.base_error import BaseError

class UnauthenticatedError(BaseError):

    def __init__(self) -> None:
        title = "Erro de autenticação."
        description = "O usuário não está autenticado."
        code = 401
        super().__init__(title, description, code)