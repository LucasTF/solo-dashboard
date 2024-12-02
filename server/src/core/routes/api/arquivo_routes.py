from flask import Blueprint, jsonify, request

from src.core.composers.arquivo_composer import ArquivoAction, compose_arquivo
from src.core.middlewares.auth_middleware import (
    check_authentication,
    check_authorization,
)
from src.errors.invalid_operation_error import InvalidOperationError
from src.views.api.types.http_request import HttpRequest


arquivo_route = Blueprint("arquivo_routes", __name__)


@arquivo_route.route("/arquivos/<int:obra_id>", methods=["POST"])
def upload(obra_id: int):
    check_authorization()

    if "files[]" not in request.files:
        raise InvalidOperationError("Nenhum arquivo foi enviado.")

    files = request.files.getlist("files[]")

    if len(files) > 3:
        raise InvalidOperationError(
            "Números de arquivos a serem enviados não podem ser superiores a 3."
        )

    http_request = HttpRequest(params={"id": obra_id}, body={"files": files})
    view = compose_arquivo(ArquivoAction.CREATE)
    http_response = view.handle(http_request)

    return "", http_response.status_code


@arquivo_route.route("/arquivos/<int:obra_id>", methods=["GET"])
def get_arquivos_by_obra_id(obra_id: int):
    check_authentication()

    http_request = HttpRequest(params={"id": obra_id})
    view = compose_arquivo(ArquivoAction.FIND_BY_OBRA_ID)
    http_response = view.handle(http_request)

    return jsonify(http_response.body), http_response.status_code
