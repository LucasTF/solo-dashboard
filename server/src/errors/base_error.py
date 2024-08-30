from abc import ABC
from typing import Tuple

from flask import Response, jsonify
from werkzeug.exceptions import HTTPException

class BaseError(ABC, HTTPException):

    def __init__(self, title: str, description: str, code: int) -> None:
        self.title = title
        self.description = description
        self.code = code

    @classmethod
    def handle(cls, error) -> Tuple[Response, int]:
        return jsonify({
            "errors": [
                {
                    "title": error.title,
                    "description": error.description
                }
            ]
        }), error.code