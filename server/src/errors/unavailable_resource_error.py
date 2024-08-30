from src.errors.base_error import BaseError

class UnavailableResourceError(BaseError):

    def __init__(self, resource_name: str = None) -> None:
        title = "Recurso não encontrado."
        description = f"{resource_name} não encontrado(s)." if resource_name else "Recurso(s) não encontrado(s)."
        code = 404
        super().__init__(title, description, code)