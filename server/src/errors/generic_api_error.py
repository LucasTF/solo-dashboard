from flask import jsonify
from src.errors.base_error import BaseError

class GenericApiError(BaseError):

    @classmethod
    def handle(self, error):
        return jsonify({
            "errors": [
                {
                    "title": "Erro ao acessar recursos da API.",
                    "description": "Não foi possível recuperar os dados requisitados."
                }
            ]
        }), 500