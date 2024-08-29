from flask import jsonify
import werkzeug.exceptions


class UnavailableResourceError(werkzeug.exceptions.HTTPException):
    code = 404
    description = "Recurso não encontrado."

    def __init__(self, resource_name: str | None = None) -> None:
        if resource_name:
            self.description = f"{resource_name} não encontrado."

    @classmethod
    def handle(self, error):
        return jsonify({
            "message": error.description
        }), error.code