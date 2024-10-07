from flask import jsonify
from src.errors.base_error import BaseError


class InvalidJwtTokenError(BaseError):
    @classmethod
    def handle(self, _):
        return jsonify(
            {
                "errors": [
                    {
                        "title": "Autorização inválida.",
                        "description": "O token de autenticação informado não é válido.",
                    }
                ]
            }
        ), 400
