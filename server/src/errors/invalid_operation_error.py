from src.errors.base_error import BaseError

class InvalidOperationError(BaseError):

    def __init__(self, operation_description: str) -> None:
        title = "Operação inválida."
        description = operation_description
        code = 405
        super().__init__(title, description, code)