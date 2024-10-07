from flask import jsonify
from pydantic_core import ValidationError
from src.errors.base_error import BaseError


class InvalidRequestBodyFieldError(BaseError):
    def __init__(self, field: str, rule: str) -> None:
        title = "Corpo da requisição inválido."
        description = f"<{field}>: {rule}"
        code = 400
        super().__init__(title, description, code)

    @classmethod
    def handle(self, error):
        if isinstance(error, ValidationError):
            response_dict = {"errors": []}

            for e in error.errors():
                error_fields = " ".join(e["loc"])
                response_dict["errors"].append(
                    {
                        "title": f"Campo(s) <{error_fields}> inválido(s).",
                        "description": f"<{error_fields}>: {e["msg"]}",
                    }
                )

            return jsonify(response_dict), 400

        return super().handle(error)
