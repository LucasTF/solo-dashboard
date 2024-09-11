from src.errors.base_error import BaseError

class UnauthorizedError(BaseError):

    def __init__(self) -> None:
        title = "Erro de autorização."
        description = "O usuário não está autorizado a acessar esse recurso."
        code = 403
        super().__init__(title, description, code)