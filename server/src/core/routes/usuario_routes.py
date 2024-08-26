from flask import Blueprint, jsonify, request

from src.core.composers.usuario_composer import UsuarioAction, compose_usuario
from src.views.api.types.http_request import HttpRequest

usuario_route = Blueprint("usuario_routes", __name__)

@usuario_route.route("/usuarios", methods=["POST"])
def create_usuario():
    http_request = HttpRequest(body=request.json)
    view = compose_usuario(UsuarioAction.CREATE)
    http_response = view.handle(http_request)

    return jsonify(http_response.body), http_response.status_code 