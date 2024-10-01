from flask import Blueprint, jsonify, request

from src.config.constants import DEFAULT_ENTRIES_PER_PAGE
from src.core.composers.cliente_composer import ClienteAction, compose_cliente
from src.core.middlewares.auth_middleware import check_authentication, check_authorization
from src.utils.query_treatment import get_positive_query_param
from src.views.api.types.http_request import HttpRequest


cliente_route = Blueprint("cliente_routes", __name__)

@cliente_route.route("/clientes", methods=["GET"])
def list_clientes():
    check_authentication()

    page = request.args.get("page")
    entries_per_page = request.args.get("entries_per_page")
    search = request.args.get("search")

    http_request = HttpRequest(params={
        "page": get_positive_query_param(page, 1),
        "entries_per_page": get_positive_query_param(entries_per_page, DEFAULT_ENTRIES_PER_PAGE),
        "search": search
    })
    view = compose_cliente(ClienteAction.LIST)
    http_response = view.handle(http_request)

    return jsonify(http_response.body), http_response.status_code

@cliente_route.route("/clientes", methods=["POST"])
def create_cliente():
    check_authorization()

    http_request = HttpRequest(body=request.json)
    view = compose_cliente(ClienteAction.CREATE)
    http_response = view.handle(http_request)

    return jsonify(http_response.body), http_response.status_code

@cliente_route.route("/clientes/<int:identifier>", methods=["GET"])
def find_cliente(identifier: int):
    check_authentication()

    http_request = HttpRequest(params={
        "identifier": identifier
    })
    view = compose_cliente(ClienteAction.FIND_BY_ID)
    http_response = view.handle(http_request)

    return http_response.body, http_response.status_code