from flask import Blueprint, jsonify, request

from src.core.composers.usuario_composer import UsuarioAction, compose_usuario
from src.utils.constants import DEFAULT_ENTRIES_PER_PAGE
from src.utils.query_treatment import get_positive_query_param
from src.views.api.types.http_request import HttpRequest

usuario_route = Blueprint("usuario_routes", __name__)

@usuario_route.route("/api/usuarios", methods=["GET"])
def list_usuarios():
    page = request.args.get("page")
    usuarios_per_page = request.args.get("usuarios_per_page")
    http_request = HttpRequest(params={
        "page": get_positive_query_param(page, 1),
        "usuarios_per_page": get_positive_query_param(usuarios_per_page, DEFAULT_ENTRIES_PER_PAGE)
    })
    view = compose_usuario(UsuarioAction.LIST)
    http_response = view.handle(http_request)

    return jsonify(http_response.body), http_response.status_code 

@usuario_route.route("/api/usuarios", methods=["POST"])
def create_usuario():
    http_request = HttpRequest(body=request.json)
    view = compose_usuario(UsuarioAction.CREATE)
    http_response = view.handle(http_request)

    return jsonify(http_response.body), http_response.status_code 