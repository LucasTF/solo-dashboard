from src.errors.base_error import BaseError

class InvalidRequestBodyError(BaseError):

    def __init__(self) -> None:
        title = "Corpo da requisição inválido."
        description = "O corpo da requisição não atende as especificações para o recurso exigido."
        code = 400
        super().__init__(title, description, code)