from src.errors.base_error import BaseError


class InternalProcessingError(BaseError):
    def __init__(self) -> None:
        title = "Erro ao processar requisição."
        description = "Não foi possível concluir a requisição."
        code = 500
        super().__init__(title, description, code)
