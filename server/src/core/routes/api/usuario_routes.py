from flask import Blueprint, jsonify, request

from src.core.composers.usuario_composer import UsuarioAction, compose_usuario
from src.core.middlewares.auth_middleware import check_authentication, check_authorization
from src.config.constants import DEFAULT_ENTRIES_PER_PAGE
from src.utils.query_treatment import get_positive_query_param
from src.views.api.types.http_request import HttpRequest

usuario_route = Blueprint("usuario_routes", __name__)

@usuario_route.route("/usuarios", methods=["GET"])
def list_usuarios():
    check_authentication()

    page = request.args.get("page")
    entries_per_page = request.args.get("entries_per_page")
    search = request.args.get("search")

    http_request = HttpRequest(params={
        "page": get_positive_query_param(page, 1),
        "entries_per_page": get_positive_query_param(entries_per_page, DEFAULT_ENTRIES_PER_PAGE),
        "search": search
    })
    view = compose_usuario(UsuarioAction.LIST)
    http_response = view.handle(http_request)

    return jsonify(http_response.body), http_response.status_code 

@usuario_route.route("/usuarios", methods=["POST"])
def create_usuario():
    check_authorization()

    http_request = HttpRequest(body=request.json)
    view = compose_usuario(UsuarioAction.CREATE)
    http_response = view.handle(http_request)

    return jsonify(http_response.body), http_response.status_code

@usuario_route.route("/usuarios/<string:identifier>", methods=["GET"])
def find_usuario(identifier: str):
    check_authentication()

    http_request = HttpRequest(params={
        "identifier": identifier
    })
    view = compose_usuario(UsuarioAction.FIND)
    http_response = view.handle(http_request)

    return http_response.body, http_response.status_code

@usuario_route.route("/usuarios/<int:id>", methods=["DELETE"])
def delete_usuario(id: int):
    decoded_token = check_authorization()

    http_request = HttpRequest(params={
        "id": id,
        "token_id": decoded_token.get("id")
    })
    view = compose_usuario(UsuarioAction.DELETE)
    http_response = view.handle(http_request)

    return "", http_response.status_code

@usuario_route.route("/usuarios/<int:id>", methods=["PUT"])
def update_usuario(id: int):
    decoded_token = check_authorization()

    http_request = HttpRequest(params={
        "id": id,
        "token_id": decoded_token.get("id")
    }, 
    body=request.json)
    view = compose_usuario(UsuarioAction.UPDATE)
    http_response = view.handle(http_request)

    return "", http_response.status_code

@usuario_route.route("/usuarios/chpass/<int:id>", methods=["PUT"])
def update_usuario_password(id: int):
    check_authorization()

    http_request = HttpRequest(params={
        "id": id
    }, 
    body=request.json)
    view = compose_usuario(UsuarioAction.UPDATE_PASSWORD)
    http_response = view.handle(http_request)

    return "", http_response.status_code