from src.errors.base_error import BaseError


class InvalidParamError(BaseError):
    def __init__(self) -> None:
        title = "Parâmetro inválido."
        description = (
            "O parâmetro informado não atende as especificações para o recurso exigido."
        )
        code = 400
        super().__init__(title, description, code)
