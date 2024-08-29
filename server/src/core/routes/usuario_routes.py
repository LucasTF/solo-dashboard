from flask import Blueprint, jsonify, request

from src.core.composers.usuario_composer import UsuarioAction, compose_usuario
from src.utils.constants import DEFAULT_ENTRIES_PER_PAGE
from src.utils.query_treatment import get_positive_query_param
from src.views.api.types.http_request import HttpRequest

usuario_route = Blueprint("usuario_routes", __name__)

@usuario_route.route("/api/usuarios", methods=["GET"])
def list_usuarios():
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

@usuario_route.route("/api/usuarios", methods=["POST"])
def create_usuario():
    http_request = HttpRequest(body=request.json)
    view = compose_usuario(UsuarioAction.CREATE)
    http_response = view.handle(http_request)

    return jsonify(http_response.body), http_response.status_code

@usuario_route.route("/api/usuarios/<string:identifier>", methods=["GET"])
def find_usuario(identifier: str):
    http_request = HttpRequest(params={
        "identifier": identifier
    })
    view = compose_usuario(UsuarioAction.FIND)
    http_response = view.handle(http_request)

    return http_response.body, http_response.status_code

@usuario_route.route("/api/usuarios/<int:id>", methods=["DELETE"])
def delete_usuario(id: int):
    http_request = HttpRequest(params={
        "id": id
    })
    view = compose_usuario(UsuarioAction.DELETE)
    http_response = view.handle(http_request)

    return "", http_response.status_code

@usuario_route.route("/api/usuarios/<int:id>", methods=["PUT"])
def update_usuario(id: int):
    http_request = HttpRequest(params={
        "id": id
    }, 
    body=request.json)
    view = compose_usuario(UsuarioAction.UPDATE)
    http_response = view.handle(http_request)

    return "", http_response.status_code

@usuario_route.route("/api/usuarios/chpass/<int:id>", methods=["PUT"])
def update_usuario_password(id: int):
    http_request = HttpRequest(params={
        "id": id
    }, 
    body=request.json)
    view = compose_usuario(UsuarioAction.UPDATE_PASSWORD)
    http_response = view.handle(http_request)

    return "", http_response.status_code